"use client";

import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, writeBatch } from "firebase/firestore";

export default function FirestoreSubmissionsSeeder() {
  const seedSubmissions = async () => {
    const batch = writeBatch(db);
    // Contador para incrementar o id da imagem no fileUrl
    let submissionImageId = 1;

    // Lista das lessons dos 3 cursos com seus respectivos ids e títulos
    const lessons = [
      { courseId: "curso1", lessonId: "aula1", lessonTitle: "Introdução ao React" },
      { courseId: "curso1", lessonId: "aula2", lessonTitle: "Componentes e Props" },
      { courseId: "curso2", lessonId: "aula1", lessonTitle: "Introdução ao Next.js" },
      { courseId: "curso2", lessonId: "aula2", lessonTitle: "Rotas Dinâmicas e API" },
      { courseId: "curso3", lessonId: "aula1", lessonTitle: "Conceitos Básicos do TypeScript" },
      { courseId: "curso3", lessonId: "aula2", lessonTitle: "Tipos, Interfaces e Generics" },
    ];

    // Usuários que farão as submissions (usar os mesmos que já atualizamos)
    const submissionUserIds = [
      "CSQtNYQyCCcm59NWmt4ubh9qw9c2",
      "JrW0NjjfneN63OOWFzZZkCwiRBA2",
    ];

    // Para cada lesson, cria 2 submissions pendentes
    lessons.forEach(({ courseId, lessonId, lessonTitle }) => {
      submissionUserIds.forEach((userId, index) => {
        // Textos de resposta para o exercício
        const submissionText =
          index === 0
            ? `Resposta da atividade "${lessonTitle}": implementei uma função de ordenação utilizando métodos nativos do JavaScript.`
            : `Resposta da atividade "${lessonTitle}": utilizei async/await para lidar com requisições assíncronas e tratamento de erros.`;

        const submission = {
          createdAt: "11 de fevereiro de 2025 às 22:39:30 UTC-3",
          fileUrl: `https://via.assets.so/movie.png?id=${submissionImageId}&q=95&w=360&h=360&fit=fill`,
          status: "pendente",
          text: submissionText,
        };

        submissionImageId++;

        const submissionRef = doc(
          collection(db, `courses/${courseId}/lessons/${lessonId}/submissions`),
          userId
        );
        batch.set(submissionRef, submission);
      });
    });

    await batch.commit();
    alert("Submissions populadas com sucesso!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Popular Submissions no Firestore</h1>
      <button onClick={seedSubmissions} className="bg-blue-500 text-white p-2 rounded">
        Criar Submissions
      </button>
    </div>
  );
}
