"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import login2 from "@/public/login-image-2.jpg"

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
    <main className="">
      <div className="rounded-md shadow-md flex flex-row flex-wrap justify-items-center justify-center bg-base-300 w-2/5 ">
        <form onSubmit={handleSubmit} className="rounded-lg w-2/4 flex flex-col gap-y-4">
          <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <div className="flex flex-row gap-6 items-center justify-center">
            <button type="submit" className="btn btn-md btn-primary text-primary-content rounded-md">
              Entrar
            </button>
            <button type="reset" className="btn btn-md btn-secondary text-secondary-content rounded-md">
              Esqueci minha senha
            </button>
          </div>
        </form>
        <div className="h-48 w-48">
          <Image
            src={login2}
            layout="responsive"
            alt=""
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </main>
  );
}
