/* eslint-disable @typescript-eslint/no-unused-vars */
// Coloque "use client" no início para marcar como Client Component
"use client";

import { useParams } from "next/navigation"; // Usando useParams ao invés de useRouter
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface Course {
  id: string;
  title: string;
  description: string;
  poster: string;
  createdAt: number;
}

const CoursePage = () => {
  const { courseId } = useParams(); // Obtendo o courseId diretamente dos parâmetros

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "courses", courseId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse(docSnap.data() as Course);
        } else {
          setError("Curso não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar os dados do curso.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{course?.title}</h1>
      <p>{course?.description}</p>
    </div>
  );
};

export default CoursePage;
