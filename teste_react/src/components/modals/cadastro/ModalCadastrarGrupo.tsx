import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import { criarGrupo } from "../../../services/GrupoServise";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalCadastrarGrupo({ show, onHide }: ModalComponentProps) {
    const [form, setForm] = useState({ descricao: "" })
    const [error, setError] = useState({ descricao: "" })

    const limparCampos = () => {
        setForm({
            descricao: ""
        })
    }

    const limparErros = () => {
        setError({
            descricao: ""
        })
    }

    const fecharModal = () => {
        limparCampos()
        limparErros()
        onHide()
    }

    async function handleCriarGrupo() {
        if (!form.descricao) {
            setError({ ...error, descricao: "Descrição é obrigatório" })
            return
        }

        try {
            await criarGrupo(form.descricao)
            limparCampos()
            fecharModal()
        } catch (e) {
            console.error(e)
        }
    }

    return (
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
            <Modal.Body>
                <div className="mb-3 d-flex gap-3">
                    <Button variant="primary" onClick={handleCriarGrupo}>Gravar</Button>
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
    )
}