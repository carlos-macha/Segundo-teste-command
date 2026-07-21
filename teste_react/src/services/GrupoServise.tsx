import axios from "axios";
import type { Grupo } from "../models/Grupo";

const API_URL = "http://localhost:3000/grupos";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getGrupos(): Promise<Grupo[]> {

    const response = await api.get<Grupo[]>("/")

    return response.data
}

export async function pesquisarPeloCodigo(
    codigo: number
): Promise<Grupo | null> {
    
    const response = await api.get<Grupo>(`/${codigo}`)

    return response.data
}

export async function criarGrupo(
   descricao: string
): Promise<Grupo> {

    const response = await api.post<Grupo>("/", { DESCRICAO: descricao })

    return response.data
}

export async function deletarGrupo(
    codigo: number
) {

    const response = await api.delete(`/${codigo}`);

    return response.data;
}

export async function editarGrupo(
    codigo: number,
    descricao: string
): Promise<Grupo> {

    const response = await api.put<Grupo>(`/${codigo}`, {DESCRICAO: descricao});

    return response.data;
}