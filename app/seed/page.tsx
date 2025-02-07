"use client";

import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, writeBatch } from "firebase/firestore";

export default function FirestoreSeeder() {
  const seedFirestore = async () => {
    const batch = writeBatch(db);
    const timestamp = Date.now();

    // Usuários
    const users = [
      { uid: "user1", name: "Alice", email: "alice@email.com", role: "aluno", progress: {}, createdAt: timestamp },
      { uid: "user2", name: "Bob", email: "bob@email.com", role: "agente", progress: {}, createdAt: timestamp },
      { uid: "user3", name: "Charlie", email: "charlie@email.com", role: "aluno", progress: {}, createdAt: timestamp },
    ];

    users.forEach((user) => {
      const userRef = doc(collection(db, "users"), user.uid);
      batch.set(userRef, user);
    });

    // Cursos
    const courses = [
      {
        id: "course1",
        title: "React Básico",
        description: "Curso introdutório de React.",
        createdAt: timestamp,
        poster: "https://via.assets.so/movie.png?w=360&h=360&fit=fill",
      },
      {
        id: "course2",
        title: "Next.js Avançado",
        description: "Aprenda Next.js em profundidade.",
        createdAt: timestamp,
        poster: "https://via.assets.so/movie.png?w=360&h=360&fit=fill",
      },
      {
        id: "course3",
        title: "TypeScript para Iniciantes",
        description: "Fundamentos do TypeScript.",
        createdAt: timestamp,
        poster: "https://via.assets.so/movie.png?w=360&h=360&fit=fill",
      },
    ];

    courses.forEach((course) => {
      const courseRef = doc(collection(db, "courses"), course.id);
      batch.set(courseRef, course);
    });

    // Aulas
    const lessons = [
      { id: "lesson1", title: "Introdução ao React", videoUrl: "https://www.youtube.com/watch?v=hd2B7XQAFls", content: "Conteúdo da aula 1", order: 1, courseId: "course1" },
      { id: "lesson2", title: "Componentes React", videoUrl: "https://www.youtube.com/watch?v=aJR7f45dBNs", content: "Conteúdo da aula 2", order: 2, courseId: "course1" },
      { id: "lesson3", title: "Fundamentos do Next.js", videoUrl: "https://www.youtube.com/watch?v=QsSUbuYeEFk", content: "Conteúdo da aula 1", order: 1, courseId: "course2" },
      { id: "lesson4", title: "Rotas e API no Next.js", videoUrl: "https://www.youtube.com/watch?v=e6FigV2fLC8", content: "Conteúdo da aula 2", order: 2, courseId: "course2" },
      { id: "lesson5", title: "Introdução ao TypeScript", videoUrl: "https://www.youtube.com/watch?v=ppDsxbUNtNQ", content: "Conteúdo da aula 1", order: 1, courseId: "course3" },
      { id: "lesson6", title: "Tipos e Interfaces", videoUrl: "https://www.youtube.com/watch?v=GWwuQl0jXU4", content: "Conteúdo da aula 2", order: 2, courseId: "course3" },
    ];

    lessons.forEach((lesson) => {
      const lessonRef = doc(collection(db, `courses/${lesson.courseId}/lessons`), lesson.id);
      batch.set(lessonRef, lesson);
    });

    await batch.commit();
    alert("Usuários, cursos e aulas criados com sucesso!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Popular Firestore</h1>
      <button onClick={seedFirestore} className="bg-blue-500 text-white p-2 rounded">
        Criar Usuários, Cursos e Aulas
      </button>
    </div>
  );
}
