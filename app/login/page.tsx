"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from '@/lib/firebase/firebaseConfig';  // Ajuste conforme o seu caminho de configuração do Firebase

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  const auth = getAuth(app);

  if (user) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login: " + error.message);
      } else {
        console.error("Erro desconhecido ao fazer login", error);
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Por favor, insira seu e-mail.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Define que o e-mail foi enviado
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao enviar e-mail de redefinição de senha:", error.message);
        alert("Erro ao enviar e-mail de redefinição de senha: " + error.message);
      } else {
        console.error("Erro desconhecido ao enviar o e-mail de redefinição de senha", error);
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-accent p-4">
      <div className="rounded-xl shadow-xl bg-base-100 p-10 w-full max-w-md space-y-6 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold text-center text-primary">Bem-vindo de volta!</h2>
        <p className="text-center text-accent mb-6">Faça login para acessar o painel.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-primary w-full transition-all duration-200 hover:border-primary-focus"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-primary w-full transition-all duration-200 hover:border-primary-focus"
            required
          />
          
          <button type="submit" className="btn btn-primary text-primary-content w-full hover:bg-primary-focus mb-4">
            Entrar
          </button>

          <button 
            type="button" 
            onClick={handleResetPassword} 
            className="btn btn-secondary text-secondary-content w-full hover:bg-secondary-focus mb-4"
          >
            {resetEmailSent ? "E-mail de redefinição enviado!" : "Esqueci minha senha"}
          </button>
          
          <div className="flex justify-center items-center">
            <span className="text-base text-accent mr-2">Não tem uma conta?</span>
            <Link href="/cadastro" className="btn btn-link text-accent">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
