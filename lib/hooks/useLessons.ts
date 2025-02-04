/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

// Tipo para uma lição
interface Lesson {
  id: string;
  courseId: string;
  title: string;
  bodyText: string;
  videoUrl: string;
  pdfUrl: string;
  order: number;
  createdAt: number;
}

// Hook para gerenciar as aulas
export function useLessons() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar aula
  const createLesson = async (lesson: Lesson): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const lessonRef = doc(db, "courses", lesson.courseId, "lessons", lesson.id)
      await setDoc(lessonRef, lesson)
    } catch (error) {
      setError("Erro ao criar aula")
    } finally {
      setLoading(false)
    }
  }

  // Obter aula por ID
  const getLesson = async (courseId: string, lessonId: string): Promise<Lesson | null> => {
    setLoading(true);
    setError(null);
    try {
      const lessonRef = doc(db, "courses", courseId, "lessons", lessonId)
      const lessonSnap = await getDoc(lessonRef)
      return lessonSnap.exists() ? (lessonSnap.data() as Lesson) : null
    } catch (error) {
      setError("Erro ao buscar aula")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Atualizar Aula
  const updateLesson = async (courseId: string, lessonId: string, data: Partial<Lesson>) => {
    setLoading(true)
    setError(null)
    try {
      const lessonRef = doc(db, "courses", courseId, "lessons", lessonId)
      await updateDoc(lessonRef, data)
      return
    }
    catch (error) {
      setError("Erro ao Atualizar a aula")
    } finally {
      setLoading(false)
    }
  }

  //Excluir aula
  const deleteLesson = async (courseId: string, lessonId: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      //
      return
    } catch (error) {
      setError("Erro ao excluir aula")
    } finally {
      setLoading(false)
    }
  }

  // Listar todas as aulas de um curso
  const listLessons = async (courseId: string): Promise<Lesson[]> => {
    setLoading(true)
    setError(null)
    try {
      const lessonRef = collection(db, "courses", courseId, "lessons")
      const querySnapshot = await getDocs(lessonRef)
      return querySnapshot.docs.map((doc) => doc.data() as Lesson)
    } catch (error) {
      setError("Erro ao listar aulas")
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    createLesson,
    getLesson,
    updateLesson,
    deleteLesson,
    listLessons,
    loading,
    error,
  }
}