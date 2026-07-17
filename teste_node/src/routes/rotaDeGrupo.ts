import { Router } from "express"
import GrupoController from "../controllers/grupoController"

const grupoController = new GrupoController()

const grupoRouter = Router()

grupoRouter.get(
    "/grupos",
    grupoController.listarGrupos.bind(grupoController)
)

grupoRouter.get(
    "/grupos/:codigo",
    grupoController.encontrarGrupoPeloCodigo.bind(grupoController)
)

grupoRouter.post(
    "/grupos",
    grupoController.criarGrupo.bind(grupoController)
)

grupoRouter.delete(
    "/grupos/:codigo",
    grupoController.deletarGrupo.bind(grupoController)
)

grupoRouter.put(
    "/grupos/:codigo",
    grupoController.editarGrupo.bind(grupoController)
)

export default grupoRouter