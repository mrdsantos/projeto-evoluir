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
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-neutral-content mb-10">
       {/* Hero Image */}
       <div
        className="hero bg-base-200 min-h-screen h-4/6"
        style={{
          backgroundImage: 'url(/home-1.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content flex items-center justify-end w-full">
          <div className="max-w-md text-right">
            <h1 className="text-5xl font-bold mb-6 text-secondary-content drop-shadow-lg bg-secondary p-2 rounded-xl">
              Transforme seu aprendizado com facilidade
            </h1>
            <p className="text-lg mb-6 text-accent-content drop-shadow-lg bg-accent p-2 rounded-xl">
              Descubra cursos interativos e dinâmicos, com uma plataforma intuitiva que faz seu aprendizado acontecer de forma prática e eficaz.
            </p>
            <button className="btn btn-primary text-primary-content text-lg px-8 rounded-full hover:bg-primary-focus transition duration-300 ease-in-out">
              Cadastre-se
            </button>
          </div>
        </div>
      </div>

      <div className="text-center max-w-2xl mt-6">
        <h1 className="text-4xl font-bold text-primary mb-4">Bem-vindo ao Projeto Evoluir</h1>
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