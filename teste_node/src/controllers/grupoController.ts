import { Request, Response, NextFunction } from "express"
import GrupoService from "../services/grupoService"
import { GrupoBody, GrupoParams } from "../types/grupoType"

class GrupoController {

    constructor(
        private grupoService: GrupoService = new GrupoService()
    ) { }

    public listarGrupos = async (
        req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const grupos = await this.grupoService.listarTodos()

            return res.json(grupos)
        } catch (error) {

            next(error)
        }
    }

    public criarGrupo = async (
        req: Request<{}, {}, GrupoBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                DESCRICAO
            } = req.body

            const group =
                await this.grupoService.criar(
                    DESCRICAO
                );

            return res
                .status(201)
                .json(group);

        } catch (error) {

            next(error)
        }
    }

    public encontrarGrupoPeloCodigo = async (
        req: Request<GrupoParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const product =
                await this.grupoService.pesquisarPeloCodigo(CODIGO)

            return res.json(product);

        } catch (error) {

            next(error)
        }
    }

    public deletarGrupo = async (
        req: Request<GrupoParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const result =
                await this.grupoService.deletar(
                    CODIGO
                );

            return res.json(result);

        } catch (error) {

            next(error)
        }
    }

    public editarGrupo = async (
        req: Request<GrupoParams, {}, GrupoBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const codigo =
                Number(req.params.codigo);

            const {
                DESCRICAO
            } = req.body

            const grupo =
                await this.grupoService.atualizar(
                    codigo,
                    DESCRICAO
                );

            return res.json(grupo)

        } catch (error) {

            next(error)
        }
    }

}

export default GrupoController