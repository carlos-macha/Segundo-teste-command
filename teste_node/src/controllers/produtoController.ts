import {
    Request,
    Response,
    NextFunction
} from "express"

import ProdutoService from "../services/produtoService"

import { AtualizarPrecoBody, ProdutoBody, ProdutoParams } from "../types/produtoType"

class ProdutoController {

    constructor(
        private produtoService: ProdutoService = new ProdutoService()
    ) { }

    public listarProdutos = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const products =
                await this.produtoService.listarTodos()

            return res.json(products);

        } catch (error) {

            next(error)
        }
    }

    public encontrarProdutoPeloCodigo = async (
        req: Request<ProdutoParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const product =
                await this.produtoService.pesquisarPeloCodigo(CODIGO)

            return res.json(product);

        } catch (error) {

            next(error)
        }
    }

    public criarProduto = async (
        req: Request<{}, {}, ProdutoBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                DESCRICAO,
                CODIGO_GRUPO,
                VALOR
            } = req.body;

            const product =
                await this.produtoService.criar(
                    DESCRICAO,
                    CODIGO_GRUPO,
                    VALOR
                );

            return res.status(201).json(product);

        } catch (error) {

            next(error)
        }
    }

    public editarProduto = async (
        req: Request<ProdutoParams, {}, ProdutoBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const codigo =
                Number(req.params.codigo);

            const {
                DESCRICAO,
                CODIGO_GRUPO,
                VALOR
            } = req.body

            const product =
                await this.produtoService.atualizar(
                    codigo,
                    DESCRICAO,
                    CODIGO_GRUPO,
                    VALOR
                )

            return res.json(product);

        } catch (error) {

            next(error)
        }
    }

    public deletarProduto = async (
        req: Request<ProdutoParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo)

            const result =
                await this.produtoService.deletar(CODIGO);

            return res.json(result)

        } catch (error) {

            next(error)
        }
    }

    public atualizarPrecos = async (
        req: Request<{}, {}, AtualizarPrecoBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                GRUPOS,
                OPERACAO,
                PERCENTUAL
            } = req.body;


            const produtos =
                await this.produtoService.atualizarPrecos(
                    GRUPOS,
                    OPERACAO,
                    PERCENTUAL
                );


            return res.json(produtos);


        } catch (error) {

            next(error)
        }
    }
}

export default ProdutoController