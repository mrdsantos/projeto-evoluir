/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams } from "next/navigation"; // Alterado para useParams
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  order: number;
}

const LessonPage = () => {
  const { courseId, lessonId } = useParams(); // Usando useParams para acessar os parâmetros da URL

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId || !courseId) return;

    const fetchLessonData = async () => {
      setLoading(true);
      setError(null);

      try {
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
  }, [courseId, lessonId]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-primary text-lg">Carregando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-error text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-base-100 text-base-content shadow-lg rounded-lg max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-4">{lesson?.title}</h1>
      <p className="text-lg mb-6">{lesson?.content}</p>
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
          className="input input-bordered w-full mb-4" 
        />
        <input 
          type="file" 
          className="file-input file-input-bordered w-full mb-4" 
        />
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center rounded-lg">
          <span className="text-gray-500">Placeholder para exibição de PDF</span>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
