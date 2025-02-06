/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={course.poster}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.description}</p>
        <Link href={`/course/${course.id}`} className="block mt-2 text-blue-600 hover:underline">
            Acessar o curso
        </Link>
      </div>
    </div>
  );
};


const Dashboard = () => {
  // Utiliza o hook de guarda de autenticação para garantir que o usuário esteja logado
  const { user, loading } = useAuthGuard();
  const { userData, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Busca os cursos somente quando o usuário estiver autenticado
  useEffect(() => {
    if (!user) return; // Aguarda até que o usuário esteja autenticado

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
    router.push("/login"); // Redireciona para a página de login após logout
  };

  // Se a autenticação ainda estiver carregando, exibe uma mensagem de carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando autenticação...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Header com boas-vindas e logout */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Bem-vindo de volta, {userData?.name || "Aluno"}!
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Sair
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coursesLoading ? (
            <div className="col-span-full text-center text-lg text-gray-500">
              Carregando cursos...
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">
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
