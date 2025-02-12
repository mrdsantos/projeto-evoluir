/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const CursosAgentes = () => {
  const { user, loading } = useAuthGuard();
  const { userData, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData: any[] = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ ...(doc.data() as any), id: doc.id });
      });
      setCourses(coursesData);
    } catch (err) {
      console.error("Erro ao carregar cursos:", err);
      setError("Erro ao carregar os cursos.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user, userData, router]);

  const handleAddCourse = async () => {
    try {
      await addDoc(collection(db, "courses"), {
        title: newCourseTitle,
        description: newCourseDescription,
        createdAt: new Date().getTime(),
      });
      setNewCourseTitle("");
      setNewCourseDescription("");
      alert("Curso adicionado com sucesso!");
      fetchCourses();
    } catch (err) {
      setError("Erro ao adicionar curso.");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir este curso?");
    if (!isConfirmed) return;

    try {
      await deleteDoc(doc(db, "courses", courseId));
      alert("Curso removido com sucesso!");
      fetchCourses();
    } catch (err) {
      setError("Erro ao remover curso.");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-base-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center bg-base-200 text-base-content shadow-sm p-4 rounded-lg mb-4">
          <h1 className="text-xl font-semibold text-base-content">Gestão de Cursos</h1>
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Sair
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Título do curso"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            placeholder="Descrição do curso"
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
          />
          <button onClick={handleAddCourse} className="btn btn-primary">Adicionar Curso</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="col-span-1 bg-base-200 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <div className="mt-4">
                <button className="btn btn-secondary btn-sm mr-2">Editar Curso</button>
                <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-error btn-sm">Remover Curso</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CursosAgentes;