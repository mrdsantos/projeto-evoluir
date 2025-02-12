/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";

interface Course {
  id: string;
  title: string;
  description: string;
  poster: string;
  createdAt: number;
}

interface Lesson {
  id: string;
  title: string;
  order: number;
}

const CoursePage = () => {
  const { user, loading: authLoading } = useAuthGuard();
  const { courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !courseId) return;

    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch course details
        const courseDocRef = doc(db, "courses", courseId as string);
        const courseDocSnap = await getDoc(courseDocRef);

        if (courseDocSnap.exists()) {
          setCourse(courseDocSnap.data() as Course);
        } else {
          setError("Curso não encontrado.");
        }

        // Fetch lessons for the course
        const lessonsCollectionRef = collection(db, "courses", courseId as string, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollectionRef);
        const lessonsList: Lesson[] = [];

        lessonsSnapshot.forEach((doc) => {
          lessonsList.push({ id: doc.id, ...doc.data() } as Lesson);
        });

        setLessons(lessonsList);
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [user, courseId]);

  if (authLoading || loading)
    return <div className="text-center text-info">Carregando...</div>;

  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <div className="container mx-auto p-6 flex">
      {/* Sidebar - Aulas */}
      <div className="w-2/5 p-4 bg-base-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-4">Aulas Disponíveis</h2>
        {lessons.length === 0 ? (
          <p className="text-center text-secondary">Não há aulas disponíveis para este curso.</p>
        ) : (
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="p-4 bg-base-100 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-primary">{lesson.title}</h3>
                <button 
                  className="btn btn-secondary mt-2"
                  onClick={() => router.push(`/courses/${courseId}/lessons/${lesson.id}`)}
                >
                  Acessar Lição
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detalhes do Curso */}
      <div className="w-3/5 ml-6 bg-base-100 rounded-md shadow-lg">
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
                onClick={() => router.push(`/courses/${courseId}/lessons/lesson1`)}
              >
                Acessar Lição
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
