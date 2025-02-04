import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";

// Inicializa o Firebase Admin (substitua por suas credenciais se necessário)
initializeApp({
  credential: cert("caminho/para/sua/credencial.json"),
});

const db = getFirestore();

// Função para criar usuários e cursos em lote
async function seedData() {
  const batch = db.batch();

  // Usuários
  const users = [
    { uid: "user1", name: "Alice", email: "alice@email.com", role: "aluno", createdAt: Date.now() },
    { uid: "user2", name: "Bob", email: "bob@email.com", role: "agente", createdAt: Date.now() },
    { uid: "user3", name: "Charlie", email: "charlie@email.com", role: "aluno", createdAt: Date.now() },
  ];

  users.forEach((user) => {
    const userRef = db.collection("users").doc(user.uid);
    batch.set(userRef, user);
  });

  // Cursos
  const courses = [
    { courseId: "course1", title: "React Básico", description: "Curso introdutório de React.", createdAt: Date.now() },
    { courseId: "course2", title: "Next.js Avançado", description: "Aprenda Next.js em profundidade.", createdAt: Date.now() },
    { courseId: "course3", title: "TypeScript para Iniciantes", description: "Fundamentos do TypeScript.", createdAt: Date.now() },
  ];

  courses.forEach((course) => {
    const courseRef = db.collection("courses").doc(course.courseId);
    batch.set(courseRef, course);
  });

  // Confirma a gravação no Firestore
  await batch.commit();
  console.log("Usuários e cursos adicionados com sucesso!");
}

// Executa o script
seedData().catch(console.error);
