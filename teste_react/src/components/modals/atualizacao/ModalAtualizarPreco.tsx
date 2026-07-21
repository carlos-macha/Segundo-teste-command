import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import type { Grupo } from "../../../models/Grupo";
import { BoxArrowRight, Gear } from "react-bootstrap-icons";
import TableComponent from "../../table/TableComponent";
import type { Produto } from "../../../models/Produto";
import { useData } from "../../../contexts/DataContext";
import ModalSelecionarVariosGrupos from "../pesquisa/ModalSelecionarVariosGrupos";
import ChipGrupo from "../../chip/ChipGrupo";
import { atualizarPreco } from "../../../services/ProdutoService";
import axios from "axios";
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean;
    onHide: () => void;
}

export default function ModalAtualizarPreco({
    show,
    onHide
}: ModalComponentProps) {

    const [opcao, setOpcao] = useState<"aumentar" | "diminuir">("aumentar");

    const [modalSelecionarGrupos, setModalSelecionarGrupos] = useState(false)

    const [percentual, setPercentual] = useState("")

    const [loadingAtuaalizacao, setLoadingAtuaalizacao] = useState(false)


    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])
    const [gruposSelecionados, setGruposSelecionados] = useState<Grupo[]>([]);
    const { produtos, loading, carregarProdutos } = useData()
    const { showToast } = useToast()

    const [error, setError] = useState({
        fator: ""
    });

    const limparCampos = () => {
        setPercentual("")

        setError({
            fator: ""
        })
    }

    function fecharModal() {
        limparCampos()
        setGruposSelecionados([])
        onHide()
    }

    useEffect(() => {
        if (gruposSelecionados.length === 0) {
            setProdutosFiltrados([])
            return
        }

        const resultado = produtos.filter(produto =>
            gruposSelecionados.some(grupo =>
                grupo.CODIGO === produto.CODIGO_GRUPO
            )
        )

        setProdutosFiltrados(resultado)

    }, [gruposSelecionados, produtos])

    function validarFormulario() {
        if (!percentual || Number(percentual) < 0) {
            setError({ ...error, fator: "Fator tem que ser maior que zero" })
            return false
        } else if (gruposSelecionados.length === 0) {
            showToast("Selecione um grupo antes.", "warning")
            return false
        }

        return true
    }

    async function handleAtualizarPreceos() {
        if (!validarFormulario()) return

        const grupos = gruposSelecionados.map(g => g.CODIGO)

        try {
            setLoadingAtuaalizacao(true)
            await atualizarPreco(grupos, opcao, Number(percentual))
            showToast("Sucesso em atualizar preço.", "success")
            limparCampos()
            carregarProdutos()
        } catch (e) {

            if (axios.isAxiosError(e)) {
                showToast(
                    e.response?.data?.error?.message ?? "Erro ao atualizar preço.",
                    "danger"
                )
            } else {
                showToast("Erro inesperado ao atualizar preço.", "danger")
            }

        } finally {
            setLoadingAtuaalizacao(false)
        }
    }

    function removerGrupo(grupo: Grupo) {

        setGruposSelecionados(anterior =>
            anterior.filter(g => g.CODIGO !== grupo.CODIGO)
        );
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
                className={
                    modalSelecionarGrupos
                        ? "modal-desativada"
                        : ""
                }
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Atualização de preço
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-body-loading">
                    {loadingAtuaalizacao && (
                        <div className="loading-overlay">
                            <Spinner animation="border" />
                        </div>
                    )}

                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>Opções</Card.Title>
                        </Card.Header>

                        <Card.Body className="d-flex gap-5">
                            <Form.Check
                                id="aumentar"
                                type="radio"
                                label="Aumentar"
                                checked={opcao === "aumentar"}
                                onChange={() => setOpcao("aumentar")}
                            />

                            <Form.Check
                                id="diminuir"
                                type="radio"
                                label="Diminuir"
                                checked={opcao === "diminuir"}
                                onChange={() => setOpcao("diminuir")}
                            />
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>

                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {gruposSelecionados.map(grupo => (
                                    <ChipGrupo
                                        key={grupo.CODIGO}
                                        grupo={grupo}
                                        onRemove={() => removerGrupo(grupo)}
                                    />
                                ))}
                            </div>

                            <Row>
                                <Col md={5}>
                                    <InputComponent
                                        text="Percentual"
                                        type="number"
                                        value={percentual}
                                        error={error.fator}
                                        onChange={(e) => setPercentual(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <div className="d-flex gap-3">
                                        <Button variant="info"
                                            onClick={() => setModalSelecionarGrupos(true)}
                                        >
                                            Selecionar grupo
                                        </Button>
                                        <Button variant="secondary"
                                            onClick={() => setGruposSelecionados([])}
                                        >
                                            Limpar
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

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
                                loading={loading}
                            />
                        </Card.Body>
                    </Card>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="primary"
                        onClick={handleAtualizarPreceos}
                    >
                        <Gear className="me-2" />
                        Atualização
                    </Button>
                    <Button onClick={fecharModal}>
                        <BoxArrowRight className="me-2" />
                        Sair
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalSelecionarVariosGrupos
                show={modalSelecionarGrupos}
                onHide={() => setModalSelecionarGrupos(false)}
                gruposSelecionados={gruposSelecionados}
                onSelect={setGruposSelecionados}
            />
        </>
    );
}