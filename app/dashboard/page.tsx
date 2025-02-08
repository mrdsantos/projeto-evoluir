/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Definição da interface para um curso
interface Course {
  id: string;
  title: string;
  description: string;
  poster: string;
  createdAt: number;
}

// Componente de Card de Curso
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="card bg-neutral text-neutral-content shadow-xl w-96 hover:shadow-2xl transition-shadow">
      <figure>
        <img
          src={course.poster}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p className="text-sm">{course.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/courses/${course.id}`} className="btn btn-primary">
            Acessar o curso
          </Link>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, loading } = useAuthGuard();
  const { userData, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData: Course[] = [];
        querySnapshot.forEach((doc) => {
          coursesData.push({ ...(doc.data() as Course), id: doc.id });
        });
        setCourses(coursesData);
      } catch (err) {
        console.error("Erro ao carregar os cursos:", err);
        setError("Erro ao carregar os cursos.");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        {/* Header com boas-vindas e logout */}
        <div className="flex justify-between items-center bg-neutral text-neutral-content shadow-md p-6 rounded-lg mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Bem-vindo de volta, {userData?.name || "Aluno"}!
            </h1>
            <p className="text-sm">Vamos continuar aprendendo!</p>
          </div>
          <button onClick={handleLogout} className="btn btn-error">
            Sair
          </button>
        </div>

        {/* Resumo rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-primary text-primary-content rounded-lg p-4">
            <div className="stat-title">Cursos disponíveis</div>
            <div className="stat-value">{courses.length}</div>
            <div className="stat-desc">Novos cursos em breve!</div>
          </div>
          <div className="stat bg-accent text-accent-content rounded-lg p-4">
            <div className="stat-title">Progresso geral</div>
            <div className="stat-value">68%</div>
            <div className="stat-desc">Continue estudando!</div>
          </div>
          <div className="stat bg-success text-success-content rounded-lg p-4">
            <div className="stat-title">Certificados emitidos</div>
            <div className="stat-value">12</div>
            <div className="stat-desc">Parabéns pelos seus certificados!</div>
          </div>
        </div>

        {/* Mensagem de erro */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coursesLoading ? (
            <div className="col-span-full text-center text-lg">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center text-lg">
              Nenhum curso disponível no momento.
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="col-span-1">
                <CourseCard course={course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
