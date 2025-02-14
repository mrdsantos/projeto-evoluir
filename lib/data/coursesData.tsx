// lib/data/coursesData.tsx

export const courseData: Record<string, { title: string; lessons: Record<string, string> }> = {
  course1: {
    title: "React Básico",
    lessons: {
      lesson1: "Introdução ao React",
      lesson2: "Componentes React",
    },
  },
  course2: {
    title: "NextJs Avançado",
    lessons: {
      lesson1: "Fundamentos do Next.js",
      lesson2: "Rotas e API no Next.js",
    },
  },
  course3: {
    title: "TypeScript para Iniciantes",
    lessons: {
      lesson1: "Introdução ao TypeScript",
      lesson2: "Tipos e Interfaces",
    },
  },
};

// Dados fictícios de alunos e submissões
export const studentsData = [
  { id: "user1", name: "João Silva" },
  { id: "user2", name: "Maria Oliveira" },
  { id: "user3", name: "Carlos Souza" },
  { id: "user4", name: "Ana Costa" },
  { id: "user5", name: "Pedro Lima" },
  { id: "user6", name: "Julia Pereira" },
];

export const submissionsData = [
  { id: "sub1", courseId: "course1", lessonId: "lesson1", userId: "user1", status: "pendente", text: "Para começar a trabalhar com React, é fundamental entender os conceitos de JSX e como ele se comunica com o DOM. Além disso, o uso de componentes facilita a organização do código, melhorando a manutenção e reutilização.", fileUrl: "", createdAt: Date.now() },
  { id: "sub2", courseId: "course2", lessonId: "lesson2", userId: "user2", status: "pendente", text: "A API do Next.js permite a construção de rotas dinâmicas com uma estrutura simples, o que facilita o desenvolvimento de aplicações escaláveis. Ao utilizar a API Routes, podemos tratar dados diretamente no backend, sem a necessidade de configurar um servidor externo.", fileUrl: "", createdAt: Date.now() },
  { id: "sub3", courseId: "course3", lessonId: "lesson1", userId: "user3", status: "pendente", text: "O TypeScript é uma extensão do JavaScript que adiciona tipagem estática, permitindo encontrar erros no código antes da execução. A utilização de interfaces ajuda a definir a forma dos objetos e torna o código mais seguro e legível.", fileUrl: "", createdAt: Date.now() },
  { id: "sub4", courseId: "course1", lessonId: "lesson2", userId: "user4", status: "pendente", text: "No React, componentes funcionais são essenciais para criar interfaces interativas. Utilizando hooks como useState e useEffect, conseguimos gerenciar estados e efeitos colaterais de maneira simples e eficaz.", fileUrl: "", createdAt: Date.now() },
  { id: "sub5", courseId: "course2", lessonId: "lesson1", userId: "user5", status: "pendente", text: "O Next.js facilita a construção de aplicações React com funcionalidades como renderização no lado do servidor e geração estática de páginas. Com isso, conseguimos melhorar a performance e SEO de nossas aplicações.", fileUrl: "", createdAt: Date.now() },
  { id: "sub6", courseId: "course3", lessonId: "lesson2", userId: "user6", status: "pendente", text: "Em TypeScript, os tipos primitivos como string, number e boolean são fundamentais. Além disso, podemos criar tipos personalizados usando interfaces e tipos literais, o que nos dá maior controle sobre a estrutura de dados em nossa aplicação.", fileUrl: "", createdAt: Date.now() },
];
