/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
// Importa as funções de CRUD e o tipo User
import { createUser, getUser, updateUser, deleteUser } from "@/lib/firebase/userFunctions";
import type { User } from "@/lib/firebase/userFunctions";

export default function UserTestPage() {
    // Estados para capturar os dados do formulário
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // Define o estado 'role' com tipo restrito a "aluno" ou "agente"
    const [role, setRole] = useState<"aluno" | "agente">("aluno");
    // Define 'userData' para armazenar o usuário recuperado, podendo ser do tipo User ou null
    const [userData, setUserData] = useState<User | null>(null);

    // Função para criar usuário
    const handleCreateUser = async () => {
        // Verifica se os campos obrigatórios foram preenchidos
        if (!uid || !name || !email) {
            alert("Preencha todos os campos!");
            return;
        }
        try {
            // Cria o usuário no Firestore; 'createdAt' é passado como timestamp em milissegundos
            await createUser({ uid, name, email, role, createdAt: Date.now() });
            alert("Usuário criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar usuário");
        }
    };

    // Função para buscar usuário
    const handleGetUser = async () => {
        if (!uid) {
            alert("Informe um UID!");
            return;
        }
        try {
            const user = await getUser(uid);
            // Atualiza o estado com os dados do usuário ou null, se não encontrado
            setUserData(user);
        } catch (error) {
            alert("Erro ao buscar usuário");
        }
    };

    // Função para atualizar usuário
    const handleUpdateUser = async () => {
        if (!uid) {
            alert("Informe um UID!");
            return;
        }
        try {
            await updateUser(uid, { name, email, role });
            alert("Usuário atualizado!");
        } catch (error) {
            alert("Erro ao atualizar usuário");
        }
    };

    // Função para excluir usuário
    const handleDeleteUser = async () => {
        if (!uid) {
            alert("Informe um UID!");
            return;
        }
        try {
            await deleteUser(uid);
            alert("Usuário excluído!");
        } catch (error) {
            alert("Erro ao excluir usuário");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Testar CRUD de Usuários</h1>

            {/* Formulário para entrada de dados do usuário */}
            <div className="flex flex-col gap-2 mb-4">
                <input
                    type="text"
                    placeholder="UID"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as "aluno" | "agente")}
                    className="border p-2"
                >
                    <option value="aluno">Aluno</option>
                    <option value="agente">Agente</option>
                </select>
            </div>

            {/* Botões para disparar as funções de CRUD */}
            <div className="flex gap-2 mb-4">
                <button onClick={handleCreateUser} className="bg-blue-500 text-white p-2 rounded">
                    Criar Usuário
                </button>
                <button onClick={handleGetUser} className="bg-green-500 text-white p-2 rounded">
                    Buscar Usuário
                </button>
                <button onClick={handleUpdateUser} className="bg-yellow-500 text-white p-2 rounded">
                    Atualizar Usuário
                </button>
                <button onClick={handleDeleteUser} className="bg-red-500 text-white p-2 rounded">
                    Excluir Usuário
                </button>
            </div>

            {/* Exibe os dados do usuário encontrado, se houver */}
            {userData && (
                <div className="p-4 bg-gray-100 border rounded">
                    <h2 className="text-xl font-semibold">Usuário Encontrado:</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
