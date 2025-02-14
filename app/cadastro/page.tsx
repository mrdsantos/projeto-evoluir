/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Hook para navegação

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(email, password, name);
      router.push("/profile"); // Redireciona para a página /profile após o cadastro bem-sucedido
    } catch (error) {
      setError("Erro ao criar conta. Verifique suas informações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 text-neutral-content p-6">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-8 rounded-2xl">
        <h1 className="text-4xl font-semibold text-primary-content mb-6 text-center">Crie sua Conta</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <input 
            type="text" 
            placeholder="Nome"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="input input-bordered input-primary text-primary-content w-full rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input input-bordered input-primary text-primary-content w-full rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input input-bordered input-primary text-primary-content w-full rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary w-full text-primary-content text-lg rounded-xl shadow-md transition-all duration-300 ease-in-out hover:bg-primary-focus"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && <p className="text-error text-center mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
}
