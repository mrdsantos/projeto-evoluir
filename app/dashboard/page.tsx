/* eslint-disable @next/next/no-img-element */
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
    <div className="card bg-base-200 text-base-content shadow-md hover:shadow-lg transition-all duration-200 w-72">
      <figure>
        <img
          src={course.poster}
          alt={course.title}
          className="w-full h-32 object-cover transition-all duration-500 hover:scale-105"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base-content text-lg">{course.title}</h2>
        <p className="text-base-content text-sm line-clamp-4">{course.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">
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
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  // Verificar se o nome foi carregado corretamente
  const firstName = userData?.name?.split(" ")[0] || "Aluno"; // Garantir que não fique vazio

  console.log("Nome do aluno:", userData?.name);  // Adicionando o log para verificar

  // Checa se o usuário tem a role de 'agente'
  const isAgent = userData?.role === "agente";

  return (
    <div className="min-h-screen p-4 bg-base-100">
      <div className="container mx-auto">
        {/* Header com boas-vindas e logout */}
        <div className="flex justify-between items-center bg-base-200 text-base-content shadow-sm p-4 rounded-lg mb-4">
          <h1 className="text-xl font-semibold text-base-content">Bem-vindo, {firstName}!</h1>
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Sair
          </button>
        </div>

        {/* Botões de ação (visíveis apenas se o usuário for "agente") */}
        {isAgent && (
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/dashboardagente">
              <button className="btn btn-warning btn-lg">
                Avaliar Respostas
              </button>
            </Link>
            <Link href="/cursosagente">
              <button className="btn btn-success btn-lg">
                Cursos
              </button>
            </Link>
          </div>
        )}

        {/* Resumo rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="stat bg-base-200 text-base-content rounded-lg p-3 shadow-sm">
            <div className="stat-title text-sm">Cursos disponíveis</div>
            <div className="stat-value text-xl">{courses.length}</div>
            <div className="stat-desc text-xs">Novos cursos em breve!</div>
          </div>
          <div className="stat bg-base-200 text-base-content rounded-lg p-3 shadow-sm">
            <div className="stat-title text-sm">Progresso geral</div>
            <div className="stat-value text-xl">68%</div>
            <div className="stat-desc text-xs">Continue estudando!</div>
          </div>
          <div className="stat bg-base-200 text-base-content rounded-lg p-3 shadow-sm">
            <div className="stat-title text-sm">Certificados emitidos</div>
            <div className="stat-value text-xl">12</div>
            <div className="stat-desc text-xs">Parabéns pelos seus certificados!</div>
          </div>
        </div>

        {/* Mensagem de erro */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coursesLoading ? (
            <div className="col-span-full text-center text-lg">
              <span className="loading loading-spinner loading-md"></span>
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
