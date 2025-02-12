"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  const handleAuth = () => {
    if (user) {
      logout();
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  // Tipando o parâmetro de newTheme
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Função para fechar o dropdown após a seleção de tema
  const closeDropdown = (event: React.MouseEvent) => {
    const dropdown = event.target as HTMLElement;
    const details = dropdown.closest("details");
    if (details) {
      details.removeAttribute("open"); // Fecha o dropdown
    }
  };

  return (
    <div className="">
      <div className="h-20 w-full flex flex-row justify-items-center">
        <Link href={"/"} className="bg-neutral pb-2 pt-3 pr-1 pl-3">
          <div className="flex justify-center items-center bg-primary text-primary-content w-fit h-full text-nowrap text-5xl px-3">
            <span className="font-barriecito">Projeto Evoluir</span>
          </div>
        </Link>
        <div className="navbar px-10">
          <div className="navbar-start">
            {/* Outros itens do menu */}
          </div>
          <div>
            {/* Outros itens do menu */}
          </div>
          <div className="navbar-end gap-3">
            <div className="flex-col justify-items-center">
              <div className="justify-items-center text-secondary">
                <FontAwesomeIcon icon={faPalette} size="lg" />
                <div className="text-sm">
                  <details className="dropdown dropdown-bottom dropdown-end cursor-pointer mt-1">
                    <summary className="">Temas</summary>
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
                              handleThemeChange(themeName); // Altera o tema
                              closeDropdown(e); // Fecha o dropdown
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
              <div
                onClick={handleAuth}
                className="flex-col justify-items-center text-secondary cursor-pointer"
              >
                <div>
                  <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                </div>
                <div className="text-sm mt-1">Sair</div>
              </div>
            ) : (
              <Link
                href={"/login"}
                className="flex-col justify-items-center text-secondary"
              >
                <div>
                  <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                </div>
                <div className="text-sm text-secondary mt-1">Login</div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-items-center">
        <Breadcrumbs />
      </div>
    </div>
  );
}
