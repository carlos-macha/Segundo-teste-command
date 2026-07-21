import { Router } from "express"
import ProdutoController from "../controllers/produtoController"

const produtoController = new ProdutoController()
const produtoRouter = Router()

produtoRouter.get(
    "/produtos",
    produtoController.listarProdutos.bind(produtoController)
)

produtoRouter.get(
    "/produtos/:codigo",
    produtoController.encontrarProdutoPeloCodigo.bind(produtoController)
)

produtoRouter.post(
    "/produtos",
    produtoController.criarProduto.bind(produtoController)
)

produtoRouter.put(
    "/produtos/atualizar-precos",
    produtoController.atualizarPrecos.bind(produtoController)
)

produtoRouter.put(
    '/produtos/:codigo',
    produtoController.editarProduto.bind(produtoController)
)

produtoRouter.delete(
    "/produtos/:codigo",
    produtoController.deletarProduto.bind(produtoController)
)

export default produtoRouter