import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import type { Grupo } from "../../../models/Grupo";
import ModalSelecionarGrupo from "../pesquisa/ModalSelecionarGrupo";
import { BoxArrowRight, Gear } from "react-bootstrap-icons";
import TableComponent from "../../table/TableComponent";
import type { Produto } from "../../../models/Produto";
import { useData } from "../../../contexts/DataContext";

interface ModalComponentProps {
    show: boolean;
    onHide: () => void;
}

export default function ModalAtualizarPreco({
    show,
    onHide
}: ModalComponentProps) {

    const [opcao, setOpcao] = useState<"aumentar" | "diminuir">("aumentar");

    const [grupoInicial, setGrupoInicial] = useState<Grupo | null>(null);
    const [grupoFinal, setGrupoFinal] = useState<Grupo | null>(null);
    const [fator, setFator] = useState("")

    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])
    const { produtos, loading } = useData()

    const [campoSelecionado, setCampoSelecionado] = useState<
        "inicial" | "final"
    >("inicial");

    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false
    });

    const [error, setError] = useState({
        grupoInicial: "",
        grupoFinal: "",
        fator: ""
    });

    const limparCampos = () => {
        setGrupoInicial(null)
        setGrupoFinal(null)
        setFator("")

        setError({
            grupoInicial: "",
            grupoFinal: "",
            fator: ""
        })
    }

    function validarFormulario() {
        if (!grupoInicial) {
            setError({ ...error, grupoInicial: "Grupo inicial é obrigatório" })
            return
        } else if (!grupoFinal) {
            setError({ ...error, grupoFinal: "Grupo final é obrigatório" })
        } else if (!fator || Number(fator) < 0) {
            setError({ ...error, fator: "Fator tem que ser maior que zero" })
        }

        return true
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    limparCampos()
                    onHide()
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className={
                    abrirModal.pesquisarGrupo
                        ? "modal-desativada"
                        : ""
                }
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Atualização de preço
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

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

                            <Row>
                                <Col md={8}>
                                    <InputComponent
                                        text="Grupo inicial"
                                        type="number"
                                        value={
                                            grupoInicial
                                                ? String(grupoInicial.CODIGO)
                                                : ""
                                        }
                                        error={error.grupoInicial}
                                        rightText={
                                            grupoInicial
                                                ? grupoInicial.DESCRICAO
                                                : ""
                                        }
                                        buttonText="Selecionar grupo"
                                        bloqueado
                                        onClick={() => {
                                            setCampoSelecionado("inicial");
                                            setAbrirModal({
                                                pesquisarGrupo: true
                                            });
                                        }}
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={8}>
                                    <InputComponent
                                        text="Grupo final"
                                        type="number"
                                        value={
                                            grupoFinal
                                                ? String(grupoFinal.CODIGO)
                                                : ""
                                        }
                                        error={error.grupoFinal}
                                        rightText={
                                            grupoFinal
                                                ? grupoFinal.DESCRICAO
                                                : ""
                                        }
                                        buttonText="Selecionar grupo"
                                        bloqueado
                                        onClick={() => {
                                            setCampoSelecionado("final");
                                            setAbrirModal({
                                                pesquisarGrupo: true
                                            });
                                        }}
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={5}>
                                    <InputComponent
                                        text="Fator"
                                        type="number"
                                        value={fator}
                                        error={error.fator}
                                        onChange={(e) => setFator(e.target.value)}
                                    />
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
                                dados={produtos.map(g => [
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
                    <Button variant="primary">
                        <Gear className="me-2" />
                        Atualização
                    </Button>
                    <Button onClick={() => {
                        limparCampos()
                        onHide()
                    }}>
                        <BoxArrowRight className="me-2" />
                        Sair
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalSelecionarGrupo
                show={abrirModal.pesquisarGrupo}
                onHide={() =>
                    setAbrirModal({
                        pesquisarGrupo: false
                    })
                }
                onSelect={(grupo) => {
                    if (campoSelecionado === "inicial") {
                        setGrupoInicial(grupo);
                    } else {
                        setGrupoFinal(grupo);
                    }

                    setAbrirModal({
                        pesquisarGrupo: false
                    });
                }}
            />
        </>
    );
}