import { Router } from "express";
import RelatorioController from "../controllers/relatorioController";

const relatorioRouter = Router()
const relatorioController = new RelatorioController()

relatorioRouter.get(
    "/relatorio-grupo",
    relatorioController.relatorioGrupos.bind(relatorioController)
)

export default relatorioRouter