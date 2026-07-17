import axios from "axios";
import type { Produto } from "../models/Produto";

const API_URL = "http://localhost:3000/produtos";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getProdutos(): Promise<Produto[]> {
    const response = await api.get<Produto[]>("/")

    return response.data
}

export async function criarProduto(
    descricao: string,
    codigoGrupo: number,
    valor: number
): Promise<Produto> {

    const response = await api.post<Produto>("/", {
        "DESCRICAO": descricao,
        "CODIGO_GRUPO": codigoGrupo,
        "VALOR": valor
    })

    return response.data
}

export async function deletarProduto(
    codigo: number
) {
    const response = await api.delete(`/${codigo}`);

    return response.data;
}

export async function editarProduto(
    codigo: number,
    descricao: string,
    codigoGrupo: number,
    valor: number
): Promise<Produto> {

    const response = await api.put<Produto>(`/${codigo}`, {
        "DESCRICAO": descricao,
        "CODIGO_GRUPO": codigoGrupo,
        "VALOR": valor
    });

    return response.data;
}
