/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/lib/context/BreadcrumbsContext";
import { useEffect, useState } from "react";
import { courseData } from "@/lib/data/coursesData"; // Importa o dicionário de cursos

const Breadcrumbs = () => {
  const pathname = usePathname();
  const { breadcrumbs, setBreadcrumb } = useBreadcrumbs();
  
  // Estado local para armazenar os breadcrumbs
  const [localBreadcrumbs, setLocalBreadcrumbs] = useState<string[]>([]);

  const pathSegments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    // Função para gerar breadcrumbs a partir do pathname
    const newBreadcrumbs: string[] = [];

    // Adicionar "Dashboard" e apontar corretamente para /dashboard
    newBreadcrumbs.push("Dashboard");

    // Verificar se é um caminho de curso
    if (pathSegments[0] === "courses" && pathSegments[1]) {
      const courseName = courseData[pathSegments[1]]?.title || "Curso";
      newBreadcrumbs.push(courseName);
    }

    // Atualize o estado local com os novos breadcrumbs
    setLocalBreadcrumbs(newBreadcrumbs);
  }, [pathname]); // Dependência no pathname

  return (
    <nav className="text-sm breadcrumbs">
      <ul className="flex space-x-2 text-base-content opacity-80">
        {localBreadcrumbs.map((name, index) => {
          // Monta o caminho completo até aquele ponto
          const href = index === 0 ? "/dashboard" : `/courses/${pathSegments[1]}`;

          return (
            <li key={index}>
              <Link href={href} className="hover:underline">
                {name}
              </Link>
              {index < localBreadcrumbs.length - 1}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
