"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Definição da interface de Submissão
interface Submission {
  id: string;
  fileUrl: string;
  status: string;
  text: string;
  userId: string;
  createdAt: number;
}

const DashboardAgentes = () => {
  const { user, loading } = useAuthGuard();
  const { userData, logout } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const submissionsData: Submission[] = [];

        // Itera sobre cada curso
        for (const courseDoc of coursesSnapshot.docs) {
          // Acessa a subcoleção de lições dentro de cada curso
          const lessonsSnapshot = await getDocs(collection(db, "courses", courseDoc.id, "lessons"));

          // Para cada lição do curso, vamos buscar as submissões pendentes
          for (const lessonDoc of lessonsSnapshot.docs) {
            const submissionsRef = collection(db, "courses", courseDoc.id, "lessons", lessonDoc.id, "submissions");
            const q = query(submissionsRef, where("status", "==", "pendente"));
            const submissionsSnapshot = await getDocs(q);

            // Adiciona cada submissão pendente ao array de resultados
            submissionsSnapshot.forEach((submissionDoc) => {
              submissionsData.push({
                id: submissionDoc.id,
                ...(submissionDoc.data() as Submission),
              });
            });
          }
        }

        // Atualiza o estado com as submissões encontradas
        setSubmissions(submissionsData);
      } catch (err) {
        console.error("Erro ao carregar submissões:", err);
        setError("Erro ao carregar as tarefas pendentes.");
      } finally {
        setSubmissionsLoading(false);
      }
    };

    fetchSubmissions();
  }, [user, userData]);

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

        {/* Mensagem de erro */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Lista de tarefas pendentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {submissionsLoading ? (
            <div className="col-span-full text-center text-lg">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="col-span-full text-center text-lg">
              Nenhuma tarefa pendente.
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="col-span-1 bg-base-200 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Submissão {submission.id}</h3>
                <img src={submission.fileUrl} alt={`Resposta do aluno`} className="w-32 h-32 object-cover" />
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
