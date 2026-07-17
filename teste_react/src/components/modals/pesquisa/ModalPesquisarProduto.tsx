import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { PlusCircle, Trash, PencilSquare, BoxArrowRight } from "react-bootstrap-icons"
import InputComponent from "../../input/InputComponent";
import { useEffect, useState } from "react";
import TableComponent from "../../table/TableComponent";
import ModalAlerta from "../alertas/ModalAlerta";
import ModalCadastrarProduto from "../cadastro/ModalCadastrarProduto";
import type { Produto } from "../../../models/Produto";
import { getProdutos } from "../../../services/ProdutoService";
import ModalExcluirProduto from "../alertas/ModalExcluirProduto";
import ModalEditarProduto from "../editar/ModalEditarProduto";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalPesquisarProduto({ show, onHide }: ModalComponentProps) {
    const [produtos, setProdutos] = useState<Produto[]>([])

    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
    const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null)

    const [abrirModal, setAbrirModal] = useState({
        cadastrarProduto: false,
        sair: false,
        excluir: false,
        produtoSelecionadoVazio: false,
        editarProduto: false
    })

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [pesquisar, setPesquisar] = useState("")
    const [opcaoPesquisa, setOpcaoPesquisa] = useState("codigo")

    const fecharModal = () => {
        setPesquisar("")
        setProdutoSelecionado(null)
        onHide()
    }

    useEffect(() => {
        if (show || modalAberta === false) {
            carregarProdutos()
        }

        if (show === false || modalAberta === true) {
            setLinhaSelecionada(null)
        }
    }, [show, modalAberta])

    async function carregarProdutos() {
        try {
            const data = await getProdutos()
            setProdutos(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={fecharModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className={modalAberta ? "modal-desativada" : ""}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Pesquisar Produtos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="mb-3 d-flex gap-3">
                            <Button variant="primary"
                                onClick={
                                    () => setAbrirModal({ ...abrirModal, cadastrarProduto: true })
                                }
                            >
                                <PlusCircle className="me-2" />
                                Adicionar
                            </Button>
                            <Button variant="danger"
                                onClick={
                                    () => {
                                        if (!produtoSelecionado) {
                                            setAbrirModal({ ...abrirModal, produtoSelecionadoVazio: true })
                                        } else {
                                            setAbrirModal({ ...abrirModal, excluir: true })
                                        }
                                    }
                                }
                            >
                                <Trash className="me-2" />
                                Remover
                            </Button>
                            <Button variant="secondary"
                                onClick={() => {
                                    if (!produtoSelecionado) {
                                        setAbrirModal({
                                            ...abrirModal,
                                            produtoSelecionadoVazio: true
                                        })
                                    } else {
                                        setAbrirModal({
                                            ...abrirModal,
                                            editarProduto: true
                                        })
                                    }
                                }}
                            >
                                <PencilSquare className="me-2" />
                                Alterar
                            </Button>

                        </Col>
                        <Col className="d-flex justify-content-end">
                            <div>
                                <Button variant="danger"
                                    onClick={onHide}
                                >
                                    <BoxArrowRight className="me-2" />
                                    sair
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Card className="mb-3">
                        <Card.Body>
                            <div className=" gap-5">
                                <div>
                                    <p>Opções de consulta</p>
                                    <div className="d-flex gap-3 mb-3">

                                        <Form.Check
                                            id="pesquisar-codigo"
                                            type="radio"
                                            label="Código"
                                            name="pesquisa"
                                            value="codigo"
                                            checked={opcaoPesquisa === "codigo"}
                                            onChange={(e) => setOpcaoPesquisa(e.target.value)}
                                        />
                                        <Form.Check
                                            id="pesquisar-descricao"
                                            type="radio"
                                            label="Descrição"
                                            name="pesquisa"
                                            value="descricao"
                                            checked={opcaoPesquisa === "descricao"}
                                            onChange={(e) => setOpcaoPesquisa(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <InputComponent
                                    text={opcaoPesquisa === "codigo" ? "Código" : "Descrição"}
                                    type={opcaoPesquisa === "codigo" ? "number" : "text"}
                                    value={pesquisar}
                                    onChange={(e) => setPesquisar(e.target.value)}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Produtos
                            </Card.Title>
                            <TableComponent
                                headers={[
                                    "Código",
                                    "Descrição",
                                    "Grupo",
                                    "Data do cadastro",
                                    "Valor"
                                ]}
                                dados={produtos.map(g => [
                                    String(g.CODIGO),
                                    g.DESCRICAO,
                                    String(g.CODIGO_GRUPO),
                                    new Date(g.DATA_CADASTRO).toLocaleDateString("pt-BR"),
                                    `R$: ${String(g.VALOR)}`
                                ])}
                                onRowSelect={(index) => {
                                    setLinhaSelecionada(index)
                                    setProdutoSelecionado(produtos[index])
                                }}
                                linhaSelecionada={linhaSelecionada}
                            />
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
            <ModalCadastrarProduto
                show={abrirModal.cadastrarProduto}
                onHide={() => setAbrirModal({ ...abrirModal, cadastrarProduto: false })}
            />
            <ModalAlerta
                show={abrirModal.sair}
                onHide={() => setAbrirModal({ ...abrirModal, sair: false })}
                buttonConfirmar={() => setAbrirModal({ ...abrirModal, sair: false })}
                text="Deseja sair do sistema?"
                textButtonConfirmar="Sim"
                textButtonRecusar="Não"
            />
            <ModalAlerta
                show={abrirModal.produtoSelecionadoVazio}
                onHide={() => setAbrirModal({ ...abrirModal, produtoSelecionadoVazio: false })}
                buttonConfirmar={() => setAbrirModal({ ...abrirModal, produtoSelecionadoVazio: false })}
                text="Selecione um grupo antes."
                textButtonConfirmar="Ok"
            />
            {produtoSelecionado && (
                <ModalExcluirProduto
                    show={abrirModal.excluir}
                    onHide={() => {
                        setAbrirModal({ ...abrirModal, excluir: false })
                        setProdutoSelecionado(null)
                    }}
                    produtoCodigo={Number(produtoSelecionado?.CODIGO ?? 0)}
                    produtoDescricao={produtoSelecionado?.DESCRICAO ?? ""}
                />
            )}
            {produtoSelecionado && (
                <ModalEditarProduto
                    show={abrirModal.editarProduto}
                    onHide={() => {
                        setAbrirModal({ ...abrirModal, editarProduto: false })
                        setProdutoSelecionado(null)
                    }}
                    produto={produtoSelecionado}
                />
            )}
        </>
    )
}