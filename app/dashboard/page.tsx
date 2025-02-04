"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";

export default function Dashboard() {
  const { user } = useAuthGuard();
  const { logout } = useAuth();
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
