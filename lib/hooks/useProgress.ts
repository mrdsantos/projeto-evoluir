/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Tipo para progresso do aluno
interface Progress {
  courseId: string;
  lessonId: string;
  userId: string;
  completed: boolean;
  timestamp: number;
}

// Hook para gerenciar progresso
export function useProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Registrar progresso do aluno
  const setProgress = async (progress: Progress): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const progressRef = doc(
        db,
        "courses",
        progress.courseId,
        "lessons",
        progress.lessonId,
        "submissions",
        progress.userId
      );
      await setDoc(progressRef, progress, { merge: true });
    } catch (error) {
      setError("Erro ao registrar progresso");
    } finally {
      setLoading(false);
    }
  };

  // Obter progresso de um aluno em uma aula
  const getProgress = async (
    courseId: string,
    lessonId: string,
    userId: string
  ): Promise<Progress | null> => {
    setLoading(true);
    setError(null);
    try {
      const progressRef = doc(
        db,
        "courses",
        courseId,
        "lessons",
        lessonId,
        "submissions",
        userId
      );
      const progressSnap = await getDoc(progressRef);
      return progressSnap.exists() ? (progressSnap.data() as Progress) : null;
    } catch (error) {
      setError("Erro ao obter progresso");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar progresso do aluno
  const updateProgress = async (
    courseId: string,
    lessonId: string,
    userId: string,
    data: Partial<Progress>
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const progressRef = doc(
        db,
        "courses",
        courseId,
        "lessons",
        lessonId,
        "submissions",
        userId
      );
      await updateDoc(progressRef, data);
    } catch (error) {
      setError("Erro ao atualizar progresso");
    } finally {
      setLoading(false);
    }
  };

  return {
    setProgress,
    getProgress,
    updateProgress,
    loading,
    error,
  };
}
