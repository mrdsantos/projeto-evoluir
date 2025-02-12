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

  useEffect(() => {
    const newBreadcrumbs: string[] = ["Dashboard"];

    // Calcula os segmentos dentro do useEffect
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments[0] === "courses" && pathSegments[1]) {
      const courseName = courseData[pathSegments[1]]?.title || "Curso";
      newBreadcrumbs.push(courseName);
    }

    setLocalBreadcrumbs(newBreadcrumbs);
  }, [pathname]); // Apenas `pathname` na lista de dependências

  return (
    <nav className="text-sm breadcrumbs">
      <ul className="flex space-x-2">
        {localBreadcrumbs.map((name, index) => {
          // Monta o caminho completo até aquele ponto
          const href = index === 0 ? "/dashboard" : `/courses/${pathname.split("/")[2]}`;

          return (
            <li key={index}>
              <Link href={href} className="badge badge-accent badge-outline">
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
