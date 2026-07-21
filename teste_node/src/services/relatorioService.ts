import { connectDatabase } from "../database/firebird";
import { RelatorioGrupo } from "../types/relatorioGrupo";
import { HttpError } from "../utils/httpError";


class RelatorioService {

    async relatorioGrupos(): Promise<RelatorioGrupo[]> {

        const db = await connectDatabase();

        return new Promise((resolve, reject) => {

            db.query(
                `
                SELECT
                    G.CODIGO,
                    G.DESCRICAO,
                    COUNT(P.CODIGO) AS QUANTIDADE_PRODUTOS,
                    MIN(P.VALOR) AS MENOR_VALOR,
                    AVG(P.VALOR) AS MEDIA_VALOR,
                    MAX(P.VALOR) AS MAIOR_VALOR

                FROM GRUPO G

                LEFT JOIN PRODUTO P
                    ON P.CODIGO_GRUPO = G.CODIGO

                GROUP BY
                    G.CODIGO,
                    G.DESCRICAO

                ORDER BY
                    G.CODIGO
                `,
                [],

                (
                    err: Error | null,
                    result: RelatorioGrupo[]
                ) => {

                    db.detach();


                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        );

                        return;
                    }


                    resolve(result);

                }
            );

        });

    }

}


export default RelatorioService