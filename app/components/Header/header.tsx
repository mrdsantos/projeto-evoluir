"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Barriecito } from "next/font/google";

const barriecito = Barriecito({
  weight: "400",
  subsets: ["latin"]
});

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mb-4 bg-base-300 text-base-content">
      <div className="h-20 w-full flex flex-row justify-items-center">
        <Link href={"/"} className="bg-neutral pb-2 pt-3 pr-1 pl-3">
          <div className="flex justify-center items-center bg-primary text-primary-content w-fit h-full text-nowrap text-5xl px-3">
            <span className={barriecito.className}>Projeto Evoluir</span>
          </div>
        </Link>
        <div className="navbar px-10">
          <div className="navbar-start">
          </div>
          <div>
          </div>
          <div className="navbar-end gap-3">
            <div className="flex-col justify-items-center">
              <div className="justify-items-center text-secondary">
                <FontAwesomeIcon icon={faPalette} size="lg" />
                <div className="text-sm">
                  <details className="dropdown dropdown-bottom dropdown-end cursor-pointer text-neutral-content mt-1">
                    <summary className="">Temas</summary>
                    <ul className="menu dropdown-content bg-base-200 text-base-content rounded-box z-[1] w-52 p-2 shadow">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
            {user ? (
              <div onClick={handleAuth} className="flex-col justify-items-center text-secondary cursor-pointer">
                <div>
                  <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                </div>
                <div className="text-sm text-neutral-content mt-1">
                  Sair
                </div>
              </div>
            ) : (
              <Link href={"/login"} className="flex-col justify-items-center text-secondary">
                <div>
                  <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                </div>
                <div className="text-sm text-neutral-content mt-1">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
