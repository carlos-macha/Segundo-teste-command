import axios from "axios";
import type { RelatorioGrupo } from "../models/RelatorioGrupo";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function gerarRealatorioDeGrupo(): Promise<RelatorioGrupo[]> {
    const response = await api.get<RelatorioGrupo[]>("/relatorio-grupo")

    return response.data
}
