import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react"

import type { Grupo } from "../models/Grupo"
import type { Produto } from "../models/Produto"

import { getGrupos } from "../services/GrupoServise"
import { getProdutos } from "../services/ProdutoService"

interface DataContextType {
    grupos: Grupo[]
    produtos: Produto[]
    loading: boolean
    carregarDados: () => Promise<void>
    carregarProdutos: () => Promise<void>
    carregarGrupos: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface Props {
    children: ReactNode;
}

export function DataProvider({ children }: Props) {

    const [grupos, setGrupos] = useState<Grupo[]>([])
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [loading, setLoading] = useState(true)

    async function carregarDados() {
        try {

            setLoading(true)

            const [gruposData, produtosData] = await Promise.all([
                getGrupos(),
                getProdutos()
            ]);

            setGrupos(gruposData)
            setProdutos(produtosData)

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarDados()
    }, [])

    async function carregarGrupos() {
        try {

            setLoading(true)

            const [gruposData] = await Promise.all([
                getGrupos(),
            ])

            setGrupos(gruposData)

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function carregarProdutos() {
        try {

            setLoading(true)

            const [produtosData] = await Promise.all([
                getProdutos(),
            ])

            setProdutos(produtosData)

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <DataContext.Provider
            value={{
                grupos,
                produtos,
                loading,
                carregarDados,
                carregarGrupos,
                carregarProdutos
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export function useData() {

    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useData deve ser usado dentro de um DataProvider.")
    }

    return context
}