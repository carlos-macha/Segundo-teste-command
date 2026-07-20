import { useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import ModalSelecionarGrupo from "../pesquisa/ModalSelecionarGrupo";
import type { Grupo } from "../../../models/Grupo";
import { criarProduto } from "../../../services/ProdutoService";
import { useData } from "../../../contexts/DataContext"
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalCadastrarProduto({ show, onHide }: ModalComponentProps) {
    const {carregarProdutos} = useData()
    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false
    })

    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ descricao: "", grupo: "", valor: "" })

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null)

    const [form, setForm] = useState({ descricao: "", valor: "" })

    const limparCampos = () => {
        setForm({
            descricao: "",
            valor: ""
        })
        setGrupoSelecionado(null)

        setError({
            descricao: "",
            grupo: "",
            valor: ""
        })
    }


    const fecharModal = () => {
        limparCampos()
        setGrupoSelecionado(null)
        onHide()
    }

    function validarFormulario() {
        if (!form.descricao) {
            setError({ ...error, descricao: "Descrição é obrigatório" })
            return
        } else if (!grupoSelecionado) {
            setError({ ...error, grupo: "Grupo é obrigatório" })
        } else if (!form.valor || Number(form.valor) < 0) {
            setError({ ...error, valor: "Valor não pode ser menor que zero" })
        }

        return true
    }

    async function handleCriarProduto() {
        if (!validarFormulario()) return

        try {
            setLoading(true)
            await criarProduto(form.descricao, grupoSelecionado?.CODIGO!, Number(form.valor))
            await carregarProdutos()
            limparCampos()
            showToast("Produto cadastrado com sucesso!", "success")
            fecharModal()
        } catch (e) {
            showToast("Erro ao cadastrar produto.", "danger")
        } finally {
            setLoading(false)
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
                className={modalAberta ? "modal-desativada" : ""}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cadastro de Produtos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-loading">
                    {loading && (
                        <div className="loading-overlay">
                            <Spinner animation="border" />
                        </div>
                    )}
                    <div className="mb-3 d-flex gap-3">
                        <Button variant="primary"
                            onClick={handleCriarProduto}
                            disabled={loading}
                        >
                            Gravar
                        </Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>
                    <Row>
                        <Col md={12}>
                            <InputComponent
                                text="Descrição"
                                type="text"
                                value={form.descricao}
                                error={error.descricao}
                                onChange={(e) => setForm({
                                    ...form,
                                    descricao: e.target.value
                                })}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <InputComponent
                                text="Grupo"
                                type="number"
                                value={grupoSelecionado ? String(grupoSelecionado.CODIGO) : ""}
                                error={error.grupo}
                                rightText={grupoSelecionado ? grupoSelecionado.DESCRICAO : ""}
                                buttonText="Selecionar grupo"
                                bloqueado={true}
                                onClick={() => setAbrirModal({
                                    ...abrirModal, pesquisarGrupo: true
                                })}
                                onChange={() => { }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            <InputComponent
                                text="Valor"
                                type="number"
                                value={form.valor}
                                error={error.valor}
                                onChange={(e) => setForm({
                                    ...form,
                                    valor: e.target.value
                                })}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <ModalSelecionarGrupo
                show={abrirModal.pesquisarGrupo}
                onHide={() => setAbrirModal({ ...abrirModal, pesquisarGrupo: false })}
                onSelect={(grupo) => { setGrupoSelecionado(grupo) }}
            />
        </>
    )
}