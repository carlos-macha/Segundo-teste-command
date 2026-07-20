import { useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import { criarGrupo } from "../../../services/GrupoServise";
import { useData } from "../../../contexts/DataContext";
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalCadastrarGrupo({ show, onHide }: ModalComponentProps) {
    const {carregarGrupos} = useData()

    const [form, setForm] = useState({ descricao: "" })
    const [error, setError] = useState({ descricao: "" })

    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()

    const limparCampos = () => {
        setForm({
            descricao: ""
        })

        setError({
            descricao: ""
        })
    }

    const fecharModal = () => {
        limparCampos()
        onHide()
    }

    async function handleCriarGrupo() {
        if (!form.descricao) {
            setError({ ...error, descricao: "Descrição é obrigatório" })
            return
        }

        try {
            setLoading(true)
            await criarGrupo(form.descricao)
            await carregarGrupos()
            limparCampos()
            fecharModal()
            showToast("Grupo cadastrado com sucesso!", "success")
        } catch (e) {
            showToast("Erro ao cadastrar grupo", "danger")
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
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cadastro de grupos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-loading">
                    {loading && (
                        <div className="loading-overlay">
                            <Spinner animation="border" />
                        </div>
                    )}
                    <div className="mb-3 d-flex gap-3">
                        <Button variant="primary" onClick={handleCriarGrupo} disabled={loading}>Gravar</Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>
                    <Row>
                        <Col md={12}>
                            <InputComponent
                                text="Descrição"
                                type="text"
                                error={error.descricao}
                                value={form.descricao}
                                onChange={(e) => setForm({
                                    ...form,
                                    descricao: e.target.value
                                })}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}