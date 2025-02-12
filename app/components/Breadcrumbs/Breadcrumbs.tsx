"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/lib/context/BreadcrumbsContext";
import { useEffect, useState } from "react";
import { courseData } from "@/lib/data/coursesData"; // Importa o dicionário de cursos

const Breadcrumbs = () => {
  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumbs();

  const [localBreadcrumbs, setLocalBreadcrumbs] = useState<string[]>([]);
  const pathSegments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    const newBreadcrumbs: string[] = ["Dashboard"];

    if (pathSegments[0] === "courses" && pathSegments[1]) {
      const courseName = courseData[pathSegments[1]]?.title || "Curso";
      newBreadcrumbs.push(courseName);
    }

    setLocalBreadcrumbs(newBreadcrumbs);
  }, [pathname]);

  return (
    <nav className="text-sm breadcrumbs">
      <ul className="flex space-x-2 text-primary">
        {localBreadcrumbs.map((name, index) => {
          const href = index === 0 ? "/dashboard" : `/courses/${pathSegments[1]}`;

          return (
            <li key={index}>
              <Link href={href} className="hover:underline">
                {name}
              </Link>
              {index < localBreadcrumbs.length - 1 && " > "}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
