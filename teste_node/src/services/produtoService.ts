import { connectDatabase } from "../database/firebird"
import { HttpError } from "../utils/httpError"
import { productSchema } from "../schemas/produtoSchema"
import { Produto } from "../types/produtoType"

class ProdutoService {
    async listarTodos(): Promise<Produto[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                "SELECT * FROM PRODUTO",
                [],

                (
                    err: Error | null,
                    result: Produto[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result)
                }
            )
        })
    }

    async pesquisarPeloCodigo(
        codigo: number
    ): Promise<Produto | null> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
            SELECT *
            FROM PRODUTO
            WHERE CODIGO = ?
            `,
                [codigo],

                (
                    err: Error | null,
                    result: Produto[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result[0] || null)
                }
            )
        })
    }

    async criar(
        descricao: string,
        codigo_grupo: number,
        valor: number
    ): Promise<Produto> {

        const parsedData =
            productSchema.parse({
                descricao,
                codigo_grupo,
                valor
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                INSERT INTO PRODUTO (
                    DESCRICAO,
                    CODIGO_GRUPO,
                    VALOR
                )
                VALUES (?, ?, ?)
                RETURNING CODIGO, DESCRICAO, CODIGO_GRUPO, DATA_CADASTRO, VALOR
                `,
                [
                    parsedData.descricao,
                    parsedData.codigo_grupo,
                    parsedData.valor
                ],

                (
                    err: Error | null,
                    result: any
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result)
                }
            )
        })
    }

    async atualizar(
        codigo: number,
        descricao: string,
        codigo_grupo: number,
        valor: number
    ): Promise<Produto> {

        const parsedData =
            productSchema.parse({
                descricao,
                codigo_grupo,
                valor
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                UPDATE PRODUTO
                SET
                    DESCRICAO = ?,
                    CODIGO_GRUPO = ?,
                    VALOR = ?
                WHERE CODIGO = ?
                RETURNING CODIGO, DESCRICAO, CODIGO_GRUPO, DATA_CADASTRO, VALOR
                `,
                [
                    parsedData.descricao,
                    parsedData.codigo_grupo,
                    parsedData.valor,
                    codigo
                ],

                (
                    err: Error | null,
                    result: Produto[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result[0])
                }
            )
        })
    }

    async deletar(codigo: number): Promise<Produto> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                DELETE FROM PRODUTO
                WHERE CODIGO = ?
                RETURNING CODIGO, DESCRICAO, CODIGO_GRUPO, DATA_CADASTRO, VALOR
                `,
                [codigo],

                (
                    err: Error | null,
                    result: Produto[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result[0])
                }
            )
        })
    }

    async atualizarPrecos(
        grupos: number[],
        operacao: "aumentar" | "diminuir",
        percentual: number
    ): Promise<Produto[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            const fator = percentual / 100;

            let calculo = "";

            if (operacao === "aumentar") {

                calculo = `
                VALOR + (VALOR * ?)
            `;

            } else {

                calculo = `
                VALOR - (VALOR * ?)
            `;
            }


            db.query(
                `
            UPDATE PRODUTO
            SET VALOR = ${calculo}
            WHERE CODIGO_GRUPO IN (${grupos.map(() => "?").join(",")})
            RETURNING 
                CODIGO,
                DESCRICAO,
                CODIGO_GRUPO,
                DATA_CADASTRO,
                VALOR
            `,
                [
                    fator,
                    ...grupos
                ],

                (
                    err: Error | null,
                    result: Produto[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    if (!result || result.length === 0) {
                        reject(
                            new HttpError(
                                404,
                                "Nenhum produto foi encontrado para os grupos informados."
                            )
                        )
                        
                        return
                    }


                    resolve(result)
                }
            )
        })
    }

}

export default ProdutoService