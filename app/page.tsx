"use client"
import { useEffect } from "react";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };
    fetchData();
  }, []);

  return <h1>Firebase Configurado 🚀</h1>;
}
