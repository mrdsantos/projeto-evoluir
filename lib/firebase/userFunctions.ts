import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Exporta a interface para que possa ser importada externamente
export interface User {
  uid: string;
  name: string;
  email: string;
  role: "aluno" | "agente";
  createdAt: number;
  progress?: Record<string, number>;
}

// Criar um novo usuário
export const createUser = async (user: User): Promise<void> => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, user);
};

// Obter dados de um usuário pelo UID
export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as User) : null;
};

// Atualizar dados de um usuário
export const updateUser = async (uid: string, data: Partial<User>): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};

// Excluir usuário
export const deleteUser = async (uid: string): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};
