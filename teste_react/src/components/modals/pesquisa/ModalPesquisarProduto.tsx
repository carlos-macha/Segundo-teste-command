import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { PlusCircle, Trash, PencilSquare, BoxArrowRight } from "react-bootstrap-icons"
import InputComponent from "../../input/InputComponent";
import { useEffect, useState } from "react";
import TableComponent from "../../table/TableComponent";
import ModalCadastrarProduto from "../cadastro/ModalCadastrarProduto";
import type { Produto } from "../../../models/Produto";
import ModalExcluirProduto from "../alertas/ModalExcluirProduto";
import ModalEditarProduto from "../editar/ModalEditarProduto";
import { useData } from "../../../contexts/DataContext";
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalPesquisarProduto({ show, onHide }: ModalComponentProps) {

    const { produtos, loading } = useData()

    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
    const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null)

    const [abrirModal, setAbrirModal] = useState({
        cadastrarProduto: false,
        sair: false,
        excluir: false,
        editarProduto: false
    })

    const { showToast } = useToast()

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [pesquisar, setPesquisar] = useState("")
    const [opcaoPesquisa, setOpcaoPesquisa] = useState<"codigo" | "descricao">("codigo")
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])

    const fecharModal = () => {
        setPesquisar("")
        setProdutoSelecionado(null)
        onHide()
    }

    useEffect(() => {
        if (show === false || modalAberta === true) {
            setLinhaSelecionada(null)
        }
    }, [show, modalAberta])


    useEffect(() => {
        filtrarProdutos();
    }, [produtos, pesquisar, opcaoPesquisa]);


    function filtrarProdutos() {
        if (opcaoPesquisa === "descricao") {
            const produtoCodigo = produtos.filter(produto =>
                produto.DESCRICAO
                    .toLowerCase().includes(pesquisar)
            )
            setProdutosFiltrados(produtoCodigo)
        } else {
            const produtoDescricao = produtos.filter(produto =>
                String(produto.CODIGO)
                    .toLowerCase().includes(pesquisar.toLowerCase())
            )
            setProdutosFiltrados(produtoDescricao)
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
                <Row className="p-2">
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
                                    !produtoSelecionado
                                        ? showToast("Selecione um grupo antes.", "warning")
                                        : setAbrirModal({ ...abrirModal, excluir: true })
                                }
                            }
                        >
                            <Trash className="me-2" />
                            Remover
                        </Button>
                        <Button variant="secondary"
                            onClick={() => {
                                !produtoSelecionado
                                    ? showToast("Selecione um grupo antes.", "warning")
                                    : setAbrirModal({ ...abrirModal, editarProduto: true })
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
                <Modal.Body>
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
                                            checked={opcaoPesquisa === "codigo"}
                                            onChange={() => setOpcaoPesquisa("codigo")}
                                        />
                                        <Form.Check
                                            id="pesquisar-descricao"
                                            type="radio"
                                            label="Descrição"
                                            checked={opcaoPesquisa === "descricao"}
                                            onChange={() => setOpcaoPesquisa("descricao")}
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
                                dados={produtosFiltrados.map(g => [
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
                                loading={loading}
                            />
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
            <ModalCadastrarProduto
                show={abrirModal.cadastrarProduto}
                onHide={() => setAbrirModal({ ...abrirModal, cadastrarProduto: false })}
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