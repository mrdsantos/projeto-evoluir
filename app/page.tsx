"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-neutral-content p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Bem-vindo ao Projeto Evoluir 🚀</h1>
        <p className="text-lg mb-6 text-base-content">
          Aprenda programação do zero ao avançado com cursos práticos e suporte especializado.
          Transforme sua carreira hoje mesmo!
        </p>
        <Link href="/cadastro">
          <button className="btn btn-primary text-primary-content px-6 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
            Comece Agora
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="card bg-base-200 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-secondary">Cursos Práticos</h2>
          <p className="text-base-content">Aprenda com projetos reais e conteúdos atualizados.</p>
        </div>
        <div className="card bg-base-200 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-secondary">Mentoria Especializada</h2>
          <p className="text-base-content">Tire suas dúvidas com profissionais experientes.</p>
        </div>
        <div className="card bg-base-200 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-secondary">Comunidade Ativa</h2>
          <p className="text-base-content">Conecte-se com outros alunos e cresça junto.</p>
        </div>
      </div>
    </div>
  );
}