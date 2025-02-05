import { auth, db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ensureUserExists = async () => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: auth.currentUser.uid,
      name: auth.currentUser.displayName || "Novo Usuário",
      email: auth.currentUser.email,
      role: "agente", // Defina a role correta para permitir escrita
      createdAt: Date.now(),
    });
    console.log("Usuário registrado no Firestore.");
  }
};
