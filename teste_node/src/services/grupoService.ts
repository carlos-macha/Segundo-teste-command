import { connectDatabase } from "../database/firebird"
import { groupSchema } from "../schemas/grupoSchema"

import { Grupo } from "../types/grupoType"
import { HttpError } from "../utils/httpError"

class GrupoService {
    async listarTodos(): Promise<Grupo[]> {
        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `SELECT
                    G.CODIGO,
                    G.DESCRICAO
                FROM GRUPO G`,
                [],

                (
                    err: Error | null,
                    result: Grupo[]
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
    ): Promise<Grupo | null> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                    SELECT *
                    FROM GRUPO
                    WHERE CODIGO = ?
                    `,
                [codigo],

                (
                    err: Error | null,
                    result: Grupo[]
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
        descricao: string
    ): Promise<Grupo> {

        const parsedData =
            groupSchema.parse({
                descricao
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                INSERT INTO GRUPO (
                    DESCRICAO
                )
                VALUES (?)
                RETURNING CODIGO, DESCRICAO
                `,
                [
                    parsedData.descricao
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

    async deletar(
        codigo: number
    ): Promise<Grupo> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
            DELETE FROM GRUPO
            WHERE CODIGO = ?
            RETURNING CODIGO, DESCRICAO
            `,
                [codigo],

                (
                    err: Error | null,
                    result: Grupo[]
                ) => {

                    db.detach()
                    if (err) {

                        if (err.message.includes("FK_PRODUTO_GRUPO")) {
                            reject(
                                new HttpError(
                                    409,
                                    "Não é possível excluir este grupo, pois existem produtos vinculados a ele."
                                )
                            );
                            return;
                        }

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        );

                        return;
                    }

                    if (!result || result.length === 0) {

                        reject(
                            new HttpError(
                                404,
                                "Grupo não encontrado."
                            )
                        )

                        return
                    }

                    resolve(result[0])
                }
            )
        })
    }

    async atualizar(
        codigo: number,
        descricao: string
    ): Promise<Grupo> {

        const parsedData =
            groupSchema.parse({
                descricao
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
            UPDATE GRUPO
            SET
                DESCRICAO = ?
            WHERE CODIGO = ?
            RETURNING CODIGO, DESCRICAO
            `,
                [
                    parsedData.descricao,
                    codigo
                ],

                (
                    err: Error | null,
                    result: Grupo[]
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
}

export default GrupoService