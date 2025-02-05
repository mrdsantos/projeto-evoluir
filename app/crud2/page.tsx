/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useCourses } from "@/lib/hooks/useCourses";
import { useLessons } from "@/lib/hooks/useLessons";

export default function DeleteTestPage() {
  const { deleteCourse } = useCourses();
  const { deleteLesson } = useLessons();
  
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");

  const handleDeleteCourse = async () => {
    if (!courseId) {
      alert("Informe um ID de curso para excluir!");
      return;
    }
    try {
      await deleteCourse(courseId);
      alert("Curso excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir curso");
    }
  };

  const handleDeleteLesson = async () => {
    if (!courseId || !lessonId) {
      alert("Informe o ID do curso e da aula para excluir!");
      return;
    }
    try {
      console.log(courseId, lessonId)
      await deleteLesson(courseId, lessonId);
      alert("Aula excluída com sucesso!");
    } catch (error) {
      alert("Erro ao excluir aula");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Testar Exclusão</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="ID do Curso"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="ID da Aula"
          value={lessonId}
          onChange={(e) => setLessonId(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={handleDeleteCourse} className="bg-red-500 text-white p-2 rounded">
          Excluir Curso
        </button>
        <button onClick={handleDeleteLesson} className="bg-red-500 text-white p-2 rounded">
          Excluir Aula
        </button>
      </div>
    </div>
  );
}