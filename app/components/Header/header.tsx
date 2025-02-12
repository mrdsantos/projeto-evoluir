"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Inicializa o estado do tema com o valor salvo no localStorage ou "cyberpunk"
  const [theme, setTheme] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("theme") || "cyberpunk"
      : "cyberpunk";
  });

  // Aplica o tema no HTML e salva no localStorage quando o usuário escolhe um novo tema
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Quando o componente monta, aplica o tema salvo no localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fecha o dropdown após selecionar um tema
  const closeDropdown = (event: React.MouseEvent) => {
    const details = (event.target as HTMLElement).closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  };

  return (
    <div>
      <div className="h-20 w-full flex flex-row justify-items-center">
        <Link href={"/"} className="bg-neutral pb-2 pt-3 pr-1 pl-3">
          <div className="flex justify-center items-center bg-primary text-primary-content w-fit h-full text-nowrap text-5xl px-3">
            <span className="font-barriecito">Projeto Evoluir</span>
          </div>
        </Link>
        <div className="navbar px-10">
          <div className="navbar-start"></div>
          <div className="navbar-end gap-8">
            <div className="flex-col justify-items-center">
              <div className="justify-items-center text-secondary">
                <FontAwesomeIcon icon={faPalette} size="lg" />
                <div className="text-sm">
                  <details className="dropdown dropdown-bottom dropdown-end cursor-pointer mt-1">
                    <summary>Temas</summary>
                    <ul className="menu dropdown-content bg-base-200 text-base-content rounded-box z-[1] w-52 p-2 shadow">
                      {[
                        "dark",
                        "bumblebee",
                        "emerald",
                        "corporate",
                        "synthwave",
                        "retro",
                        "cyberpunk",
                        "valentine",
                        "garden",
                        "pastel",
                        "dracula",
                        "sunset",
                      ].map((themeName) => (
                        <li key={themeName}>
                          <a
                            onClick={(e) => {
                              handleThemeChange(themeName);
                              closeDropdown(e);
                            }}
                            className="cursor-pointer"
                          >
                            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </div>

            {user ? (
              <Link href="/profile">
                <div className="flex-col justify-items-center text-secondary cursor-pointer">
                  <FontAwesomeIcon icon={faUser} size="xl" />
                  <div className="text-sm mt-1">Meu Perfil</div>
                </div>
              </Link>
            ) : null}

            {user ? (
              <div onClick={() => { logout(); router.push("/"); }} className="flex-col justify-items-center text-secondary cursor-pointer">
                <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                <div className="text-sm mt-1">Sair</div>
              </div>
            ) : (
              <Link href={"/login"} className="flex-col justify-items-center text-secondary">
                <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                <div className="text-sm text-secondary mt-1">Login</div>
              </Link>
            )}
          </div>
        </div>
      </div>
      {user ? (
        <div className="flex flex-col items-center justify-items-center">
          <Breadcrumbs />
        </div>
      ) : null}
    </div>
  );
}
