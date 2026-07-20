import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import ModalSelecionarGrupo from "../pesquisa/ModalSelecionarGrupo";
import type { Grupo } from "../../../models/Grupo";
import { editarProduto } from "../../../services/ProdutoService";
import type { Produto } from "../../../models/Produto";
import { useData } from "../../../contexts/DataContext"
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    produto: Produto
}

export default function ModalEditarProduto({ show, onHide, produto }: ModalComponentProps) {
    const {carregarProdutos, grupos} = useData()
    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false
    })

    const { showToast } = useToast()

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ descricao: "", grupo: "", valor: "" })

    const [form, setForm] = useState({
        codigo: String(produto.CODIGO),
        descricao: produto.DESCRICAO,
        valor: String(produto.VALOR)
    })

    const limparCampos = () => {
        setForm({
            ...form,
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
        onHide()
        setGrupoSelecionado(null)
    }

    useEffect(() => {
        if (show) handlePesquisarGrupo()
    }, [show])

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

    async function handleEditarProduto() {
        if (!validarFormulario()) return

        try {
            setLoading(true)
            await editarProduto(produto.CODIGO, form.descricao, grupoSelecionado?.CODIGO!, Number(form.valor))
            await carregarProdutos()
            limparCampos()
            showToast("Produto editado com sucesso!", "success")
            fecharModal()
        } catch (e) {
            showToast("Erro ao editar produto.", "danger")
        } finally {
            setLoading(false)
        }
    }

    async function handlePesquisarGrupo() {
        const grupo = grupos.find(grupo => grupo.CODIGO === produto.CODIGO_GRUPO)
        if (grupo) setGrupoSelecionado(grupo)    
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
                        Editar produto
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
                            onClick={handleEditarProduto}
                            disabled={loading}
                        >
                            Gravar
                        </Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>

                    <Row>
                        <Col md={5}>
                            <InputComponent
                                text="Código"
                                type="number"
                                value={form.codigo}
                                bloqueado={true}
                                onChange={() => { }}
                            />
                        </Col>
                    </Row>

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