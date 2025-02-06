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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{lesson?.title}</h1>
      <p>{lesson?.content}</p>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${lesson?.videoUrl.split('v=')[1]}`}
          title="YouTube video player"
          allow=""
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LessonPage;
