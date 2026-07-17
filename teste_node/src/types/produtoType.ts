export interface Produto {

    CODIGO: number

    DESCRICAO: string

    CODIGO_GRUPO: number

    VALOR: number
}

export interface ProdutoBody {

    DESCRICAO: string

    CODIGO_GRUPO: number

    VALOR: number
}

export interface ProdutoParams {

    codigo: string
}