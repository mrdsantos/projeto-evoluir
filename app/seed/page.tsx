"use client";

import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, writeBatch } from "firebase/firestore";

export default function FirestoreSeeder() {
  const seedFirestore = async () => {
    const batch = writeBatch(db);

    // Usuários
    const users = [
      { uid: "user1", name: "Alice", email: "alice@email.com", role: "aluno", createdAt: Date.now() },
      { uid: "user2", name: "Bob", email: "bob@email.com", role: "agente", createdAt: Date.now() },
      { uid: "user3", name: "Charlie", email: "charlie@email.com", role: "aluno", createdAt: Date.now() },
    ];

    users.forEach((user) => {
      const userRef = doc(collection(db, "users"), user.uid);
      batch.set(userRef, user);
    });

    // Cursos
    const courses = [
      { courseId: "course1", title: "React Básico", description: "Curso introdutório de React.", createdAt: Date.now() },
      { courseId: "course2", title: "Next.js Avançado", description: "Aprenda Next.js em profundidade.", createdAt: Date.now() },
      { courseId: "course3", title: "TypeScript para Iniciantes", description: "Fundamentos do TypeScript.", createdAt: Date.now() },
    ];

    courses.forEach((course) => {
      const courseRef = doc(collection(db, "courses"), course.courseId);
      batch.set(courseRef, course);
    });

    // Confirma a gravação no Firestore
    await batch.commit();
    alert("Usuários e cursos criados com sucesso!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Popular Firestore</h1>
      <button onClick={seedFirestore} className="bg-blue-500 text-white p-2 rounded">
        Criar Usuários e Cursos
      </button>
    </div>
  );
}
