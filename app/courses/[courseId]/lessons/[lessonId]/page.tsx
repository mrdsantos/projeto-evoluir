/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase/firebaseConfig"; // Certifique-se de que o storage está exportado corretamente
import { doc, getDoc, setDoc, collection, updateDoc, getDocs } from "firebase/firestore";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import Link from "next/link";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  order: number;
}

const LessonPage = () => {
  const { user, loading: authLoading } = useAuthGuard();
  const { courseId, lessonId } = useParams();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]); // Armazena todas as lições do curso
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [responseText, setResponseText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !lessonId || !courseId) return;

    const fetchLessonData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch todas as lições do curso
        const lessonsCollectionRef = collection(db, "courses", courseId as string, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollectionRef);
        const lessonsList: Lesson[] = [];
        lessonsSnapshot.forEach((doc) => {
          lessonsList.push({ id: doc.id, ...doc.data() } as Lesson);
        });

        // Ordena as lições por ordem (order)
        lessonsList.sort((a, b) => a.order - b.order);
        setLessons(lessonsList);

        // Buscar a lição atual
        const docRef = doc(db, "courses", courseId as string, "lessons", lessonId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLesson(docSnap.data() as Lesson);
        } else {
          setError("Lição não encontrada.");
        }
      } catch (err) {
        setError("Erro ao carregar os dados da lição.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [user, courseId, lessonId]);

  // Determina a lição anterior
  const getPreviousLesson = () => {
    if (!lesson) return null;
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex > 0) {
      return lessons[currentIndex - 1];
    }
    return null;
  };

  // Determina a próxima lição
  const getNextLesson = () => {
    if (!lesson) return null;
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1];
    }
    return null;
  };

  // Envia a resposta de texto para o Firestore
  const sendResponse = async () => {
    if (!responseText || !user || !lessonId || !courseId) return;

    const responseRef = doc(db, "courses", courseId as string, "lessons", lessonId as string, "submissions", user.uid);

    const newResponse = {
      userId: user.uid,
      text: responseText,
      status: "pendente",
      createdAt: new Date(),
    };

    try {
      await setDoc(responseRef, newResponse);
      setResponseText(""); // Limpar campo de resposta após o envio
      alert("Resposta enviada com sucesso!");
    } catch (error) {
      setError("Erro ao enviar a resposta.");
    }
  };

  // Envia o arquivo para o Firebase Storage e retorna a URL
  const uploadFile = async () => {
    if (!file || !user || !lessonId || !courseId) return;

    const fileRef = ref(storage, `responses/${courseId}/${lessonId}/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progresso do upload (não necessário, mas você pode mostrar o progresso se quiser)
      },
      (error) => {
        setUploading(false);
        setError("Erro ao fazer upload do arquivo.");
      },
      async () => {
        // Quando o upload for concluído com sucesso
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

        // Salva a URL do arquivo no Firestore
        await saveFileUrlToFirestore(fileUrl);
      }
    );
  };

  // Atualiza o Firestore com a URL do arquivo
  const saveFileUrlToFirestore = async (fileUrl: string) => {
    if (!user || !lessonId || !courseId) return;

    const responseRef = doc(db, "courses", courseId as string, "lessons", lessonId as string, "submissions", user.uid);

    try {
      await updateDoc(responseRef, {
        fileUrl,
        status: "pendente", // Se necessário, altere para "corrigido" após revisão
      });
      setFile(null); // Limpar arquivo após o envio
      alert("Arquivo enviado com sucesso!");
    } catch (error) {
      setError("Erro ao salvar a URL do arquivo.");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading)
    return <div className="flex justify-center items-center min-h-screen text-primary text-lg">Carregando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-error text-lg">{error}</div>;

  const previousLesson = getPreviousLesson();
  const nextLesson = getNextLesson();

  return (
    <div className="container mx-auto p-6 bg-base-100 text-base-content shadow-lg rounded-lg max-w-3xl">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-primary mb-4">{lesson?.title}</h1>
        <Link href="/dashboard" className="btn btn-secondary">Dashboard</Link>
      </div>
      <p className="text-lg mb-6 text-secondary">{lesson?.content}</p>

      {/* Navegação de lições */}
      <div className={`flex mb-6 ${previousLesson && nextLesson ? 'justify-between' : previousLesson ? 'justify-start' : 'justify-end'}`}>
        {previousLesson && (
          <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`} className="btn btn-xs">
            Lição Anterior
          </Link>
        )}
        {nextLesson && (
          <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="btn btn-xs">
            Próxima Lição
          </Link>
        )}
      </div>


      <div className="flex justify-center">
        <iframe
          className="w-full max-w-2xl h-64 sm:h-96 rounded-lg"
          src={`https://www.youtube.com/embed/${lesson?.videoUrl.split('v=')[1]}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-6">
        <label className="block text-lg font-semibold mb-2">Envie sua resposta:</label>
        <input
          type="text"
          placeholder="Digite sua resposta aqui..."
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <button onClick={sendResponse} className="btn btn-primary mb-4">
          Enviar Resposta
        </button>

        <label className="block text-lg font-semibold mb-2">Envie seu arquivo:</label>
        <input
          type="file"
          className="file-input file-input-bordered w-full mb-4"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          key={file ? file.name : "new"}  // Isso força o reset do input quando o arquivo for enviado
        />
        <button onClick={uploadFile} className="btn btn-secondary mb-4" disabled={uploading}>
          {uploading ? "Enviando..." : "Enviar Arquivo"}
        </button>

        <div className="w-full h-64 bg-gray-200 flex justify-center items-center rounded-lg">
          <span className="text-gray-500">Placeholder para exibição de PDF</span>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
