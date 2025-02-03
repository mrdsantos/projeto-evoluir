"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1>Bem-vindo, {user.email}!</h1>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4">
        Sair
      </button>
    </div>
  );
}
