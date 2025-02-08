/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(email, password, name);
    } catch (error) {
      setError("Erro ao criar conta. Verifique suas informações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-neutral-content p-6">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">Crie sua Conta</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="input input-bordered w-full"
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input input-bordered w-full"
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input input-bordered w-full"
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary w-full text-primary-content"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && <p className="text-error text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}