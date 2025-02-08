/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams, useRouter } from "next/navigation";
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
  const { courseId } = useParams();
  const router = useRouter();

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

  if (loading) return <div className="text-center text-info">Carregando...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="card w-full bg-base-200 shadow-xl p-6">
        <figure>
          <img src={course?.poster} alt={course?.title} className="rounded-lg" />
        </figure>
        <div className="card-body text-center">
          <h1 className="text-3xl font-bold text-primary">{course?.title}</h1>
          <p className="text-base-content mt-2">{course?.description}</p>
          <div className="card-actions justify-center mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => router.push(`/courses/course1/lessons/lesson1`)}
            >
              Acessar Lição
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;