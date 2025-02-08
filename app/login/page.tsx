"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-accent p-4 -m-5">
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
          
          <button type="reset" className="btn btn-secondary text-secondary-content w-full hover:bg-secondary-focus mb-4">
            Esqueci minha senha
          </button>
          
          <div className="flex justify-center items-center">
            <span className="text-base text-accent mr-2">Não tem uma conta?</span>
            <button className="btn btn-link text-accent">
              Cadastre-se
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
