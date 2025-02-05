"use client";

import { useStorage } from "@/lib/hooks/useStorage";
import { useState } from "react";

export default function UploadComponent() {
  const { progress, downloadURL, error, uploadFile } = useStorage();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (file) {
      uploadFile(file, `courses/images/${file.name}`);
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded mt-2"
        disabled={!file}
      >
        Upload
      </button>

      {progress > 0 && <p>Progresso: {progress.toFixed(2)}%</p>}
      {downloadURL && <p>Arquivo disponível em: <a href={downloadURL} target="_blank">{downloadURL}</a></p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
    </div>
  );
}
