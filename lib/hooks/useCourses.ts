/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

// Tipo para um curso
interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

// Hook para gerenciar cursos
export function useCourses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar curso
  const createCourse = async (course: Course): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const courseRef = doc(db, "courses", course.id);
      await setDoc(courseRef, course);
    } catch (error) {
      setError("Erro ao criar curso");
    } finally {
      setLoading(false);
    }
  };

  // Obter curso por ID
  const getCourse = async (id: string): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    try {
      const courseRef = doc(db, "courses", id);
      const courseSnap = await getDoc(courseRef);
      return courseSnap.exists() ? (courseSnap.data() as Course) : null;
    } catch (error) {
      setError("Erro ao buscar curso");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar curso
  const updateCourse = async (id: string, data: Partial<Course>): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const courseRef = doc(db, "courses", id);
      await updateDoc(courseRef, data);
    } catch (error) {
      setError("Erro ao atualizar curso");
    } finally {
      setLoading(false);
    }
  };

  // Excluir curso
  const deleteCourse = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const courseRef = doc(db, "courses", id);
      await deleteDoc(courseRef);
    } catch (error) {
      setError("Erro ao excluir curso");
    } finally {
      setLoading(false);
    }
  };

  // Listar todos os cursos
  const listCourses = async (): Promise<Course[]> => {
    setLoading(true);
    setError(null);
    try {
      const coursesRef = collection(db, "courses");
      const querySnapshot = await getDocs(coursesRef);
      return querySnapshot.docs.map((doc) => doc.data() as Course);
    } catch (error) {
      setError("Erro ao listar cursos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    listCourses,
    loading,
    error,
  };
}
