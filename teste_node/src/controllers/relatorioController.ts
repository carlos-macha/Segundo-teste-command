import { Request, Response, NextFunction } from "express";
import RelatorioService from "../services/relatorioService";


class RelatorioController {

    constructor(
        private relatorioService: RelatorioService = new RelatorioService()
    ) { }


    public relatorioGrupos = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const resultado =
                await this.relatorioService.relatorioGrupos();


            return res.json(resultado);


        } catch(error) {

            next(error);

        }

    }

}


export default RelatorioController