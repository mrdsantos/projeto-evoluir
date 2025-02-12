"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/lib/context/BreadcrumbsContext";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const { breadcrumbs, setBreadcrumb } = useBreadcrumbs();

  const pathSegments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    const fetchBreadcrumbName = async (key: string, collection: string, id: string) => {
      if (!id || breadcrumbs[key]) return;

      try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBreadcrumb(key, docSnap.data().title);
        }
      } catch (error) {
        console.error(`Erro ao buscar ${collection}:`, error);
      }
    };

    if (pathSegments[0] === "courses" && pathSegments[1]) {
      fetchBreadcrumbName(`course-${pathSegments[1]}`, "courses", pathSegments[1]);
    }

    if (pathSegments[0] === "courses" && pathSegments[1] && pathSegments[2] === "lessons" && pathSegments[3]) {
      fetchBreadcrumbName(`lesson-${pathSegments[3]}`, `courses/${pathSegments[1]}/lessons`, pathSegments[3]);
    }
  }, [pathname, breadcrumbs, setBreadcrumb]);

  const getBreadcrumbName = (segment: string, index: number) => {
    if (segment === "dashboard") return "Dashboard";
    if (segment === "courses" && pathSegments[index + 1]) return breadcrumbs[`course-${pathSegments[index + 1]}`] || "Curso";
    if (segment === "lessons" && pathSegments[index + 1]) return breadcrumbs[`lesson-${pathSegments[index + 1]}`] || "Lição";
    return null;
  };

  return (
    <nav className="text-sm breadcrumbs">
      <ul className="flex space-x-2 text-primary">
        {pathSegments.map((segment, index) => {
          const name = getBreadcrumbName(segment, index);
          if (!name) return null;

          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          return (
            <li key={index}>
              <Link href={href} className="hover:underline">
                {name}
              </Link>
              {index < pathSegments.length - 1 && " > "}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
