import { storage } from "@/lib/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

interface UploadResult {
  progress: number;
  downloadURL: string | null;
  error: string | null;
  uploadFile: (file: File, path: string) => void;
}

export function useStorage(): UploadResult {
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = (file: File, path: string) => {
    setProgress(0);
    setDownloadURL(null);
    setError(null);

    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percent);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
      }
    );
  };

  return { progress, downloadURL, error, uploadFile };
}
