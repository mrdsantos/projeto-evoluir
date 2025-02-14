// pages/dashboard/agents.tsx

"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";  // Reintroduzido
import { useRouter } from "next/navigation";
import { courseData, studentsData, submissionsData } from "@/lib/data/coursesData";

// Definição da interface de Submissão
interface Submission {
  id: string;
  courseId: string;
  lessonId: string;
  userId: string;
  status: string;
  text: string;
  fileUrl: string;
  createdAt: number;
}

const DashboardAgentes = () => {
  const { userData, logout } = useAuth();
  const [submissions] = useState<Submission[]>(submissionsData);  // Não precisa de setSubmissions se não for atualizar o estado
  const router = useRouter();

  // Verifica se o usuário tem permissão para acessar a página
  useAuthGuard();  // Adicionando o guardião de autenticação

  // Função para buscar o nome do curso
  const getCourseName = (courseId: string) => {
    const course = courseData[courseId];
    return course ? course.title : "Curso Desconhecido";
  };

  // Função para buscar o nome da lição
  const getLessonName = (courseId: string, lessonId: string) => {
    const course = courseData[courseId];
    const lessonName = course?.lessons[lessonId];
    return lessonName || "Lição Desconhecida";
  };

  // Função para buscar o nome do aluno
  const getStudentName = (userId: string) => {
    const student = studentsData.find(student => student.id === userId);
    return student ? student.name : "Aluno Desconhecido";
  };

  // Função que monta o título da submissão
  const getSubmissionTitle = (submission: Submission) => {
    const courseName = getCourseName(submission.courseId);
    const lessonName = getLessonName(submission.courseId, submission.lessonId);
    const studentName = getStudentName(submission.userId);
    return `Avaliar: ${courseName} - ${lessonName} - ${studentName}`;
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-4 bg-base-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-base-200 text-base-content shadow-sm p-4 rounded-lg mb-4">
          <h1 className="text-xl font-semibold text-base-content">Bem-vindo, {userData?.name}!</h1>
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Sair
          </button>
        </div>

        {/* Lista de tarefas pendentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {submissions.length === 0 ? (
            <div className="col-span-full text-center text-lg">
              Nenhuma tarefa pendente.
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="col-span-1 bg-base-200 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Submissão: {getSubmissionTitle(submission)}</h3>
                <p className="text-sm">{submission.text}</p>
                <p className="text-xs">Enviado em: {new Date(submission.createdAt).toLocaleString()}</p>
                <div className="mt-4">
                  <button className="btn btn-success btn-sm mr-2">Marcar como Correto</button>
                  <button className="btn btn-error btn-sm">Marcar como Errado</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAgentes;
