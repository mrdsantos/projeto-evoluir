/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Lista de países (exemplo)
const countries = ["Brasil", "Argentina", "Chile", "Uruguai"];

// Lista de estados brasileiros (abreviações)
const statesBrazil = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// Função para formatar o CPF para exibição (xxx.xxx.xxx-xx)
const formatCPF = (cpf: string) => {
  if (cpf.length !== 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Função para formatar telefone/whatsapp para exibição ((00) 0 0000-0000)
const formatPhone = (phone: string) => {
  if (phone.length !== 11) return phone;
  return phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
};

// Função para formatar CEP para exibição (00000-000)
const formatCEP = (cep: string) => {
  if (cep.length !== 8) return cep;
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  country: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  cpf: string;
  birthdate: string;
  address: Address;
}

const ProfilePage = () => {
  const { userData } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  // Auth Guard: redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!userData?.uid) {
      router.push("/login");
    }
  }, [userData, router]);

  // Recupera os dados do perfil do usuário
  useEffect(() => {
    if (!userData?.uid) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", userData.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          setError("Perfil não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError("Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userData]);

  // Atualiza os dados do perfil no Firestore
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !userData?.uid) return;

    // Validação do formulário: todos os campos obrigatórios precisam estar preenchidos
    if (
      !profile.name ||
      !profile.phone ||
      !profile.whatsapp ||
      !profile.cpf ||
      !profile.birthdate ||
      !profile.address?.street ||
      !profile.address?.number ||
      !profile.address?.neighborhood ||
      !profile.address?.cep ||
      !profile.address?.city ||
      !profile.address?.state ||
      !profile.address?.country
    ) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setFormError(null);

    try {
      const userDocRef = doc(db, "users", userData.uid);
      const updatedProfile = {
        name: profile.name,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        cpf: profile.cpf,
        birthdate: profile.birthdate,
        address: profile.address,
      };

      await updateDoc(userDocRef, updatedProfile);
      toast.success("Perfil atualizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      toast.error("Erro ao atualizar perfil.");
    }
  };

  // Atualiza os campos pessoais; remove caracteres não numéricos para phone, whatsapp e cpf
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value;
    if (["phone", "whatsapp", "cpf"].includes(name)) {
      cleanedValue = value.replace(/\D/g, "");
    }
    setProfile((prev) => (prev ? { ...prev, [name]: cleanedValue } : null));
  };

  // Atualiza os campos do endereço; para CEP remove caracteres não numéricos
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let cleanedValue = value;
    if (name === "cep") {
      cleanedValue = value.replace(/\D/g, "");
    }
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            address: {
              ...prev.address,
              [name]: cleanedValue,
            },
          }
        : null
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Atualizar Perfil</h1>

        {error && <div className="alert alert-error mb-4">{error}</div>}
        {formError && <div className="alert alert-error mb-4">{formError}</div>}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Seção: Informações Pessoais */}
            <div className="col-span-1 sm:col-span-2">
              <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Nome Completo</span>
              </label>
              <input
                type="text"
                name="name"
                value={profile?.name || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={profile?.email || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Email"
                disabled
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Telefone</span>
              </label>
              <input
                type="text"
                name="phone"
                value={profile?.phone || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Telefone"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Whatsapp</span>
              </label>
              <input
                type="text"
                name="whatsapp"
                value={profile?.whatsapp || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Whatsapp"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">CPF</span>
              </label>
              <input
                type="text"
                name="cpf"
                value={formatCPF(profile?.cpf || "")}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="CPF"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Data de Nascimento</span>
              </label>
              <input
                type="date"
                name="birthdate"
                value={profile?.birthdate || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Seção: Endereço */}
            <div className="col-span-1 sm:col-span-2">
              <h2 className="text-2xl font-semibold">Endereço</h2>
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Rua</span>
              </label>
              <input
                type="text"
                name="street"
                value={profile?.address?.street || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                placeholder="Rua"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Número</span>
              </label>
              <input
                type="text"
                name="number"
                value={profile?.address?.number || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                placeholder="Número"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Bairro</span>
              </label>
              <input
                type="text"
                name="neighborhood"
                value={profile?.address?.neighborhood || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                placeholder="Bairro"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">CEP</span>
              </label>
              <input
                type="text"
                name="cep"
                value={formatCEP(profile?.address?.cep || "")}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                placeholder="CEP"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Cidade</span>
              </label>
              <input
                type="text"
                name="city"
                value={profile?.address?.city || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                placeholder="Cidade"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">Estado</span>
              </label>
              <select
                name="state"
                value={profile?.address?.state || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                required
              >
                <option value="">Selecione o estado</option>
                {statesBrazil.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="label">
                <span className="label-text">País</span>
              </label>
              <select
                name="country"
                value={profile?.address?.country || ""}
                onChange={handleAddressChange}
                className="input input-bordered w-full"
                required
              >
                <option value="">Selecione o país</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full">
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
