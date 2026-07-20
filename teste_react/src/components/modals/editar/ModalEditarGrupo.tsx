import { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import { editarGrupo } from "../../../services/GrupoServise";
import type { Grupo } from "../../../models/Grupo";
import { useData } from "../../../contexts/DataContext";
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    grupo: Grupo
}

export default function ModalEditarGrupo({ show, grupo, onHide }: ModalComponentProps) {
    const {carregarGrupos} = useData()
    const [form, setForm] = useState({ codigo: String(grupo.CODIGO), descricao: grupo.DESCRICAO })
    const [error, setError] = useState({ codigo: "", descricao: "" })

    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()

    const limparCampos = () => {
        setForm({
            ...form,
            descricao: ""
        })

        setError({
            codigo: "",
            descricao: ""
        })
    }

    const fecharModal = () => {
        limparCampos()
        onHide()
    }

    useEffect(() => {
        setForm({
            codigo: String(grupo.CODIGO),
            descricao: grupo.DESCRICAO
        })
    }, [grupo])

    function validarFormulario() {
        if (!form.codigo) {
            setError({ ...error, codigo: "Código é obrigatório" })
            return
        } else if (Number(form.codigo) <= 0) {
            setError({ ...error, codigo: "Código não pode ser menor ou igual a zero" })
            return
        } else if (!form.descricao) {
            setError({ ...error, descricao: "Descrição é obrigatório" })
            return
        }

        return true
    }

    async function handleEditarGrupo() {
        if (!validarFormulario() || !grupo.CODIGO) return

        try {
            setLoading(true)
            await editarGrupo(grupo.CODIGO, form.descricao)
            await carregarGrupos()
            limparCampos()
            showToast("Grupo editado com sucesso!", "success")

            fecharModal()
        } catch (e) {
            showToast("Erro ao editar grupo.", "danger")
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
                        <Button variant="primary" onClick={handleEditarGrupo} disabled={loading}>Gravar</Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>
                    <InputComponent
                        text="Codigo"
                        type="number"
                        error={error.codigo}
                        value={form.codigo}
                        bloqueado={true}
                        onChange={(e) => setForm({
                            ...form,
                            codigo: e.target.value
                        })}
                    />
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
                </Modal.Body>
            </Modal>
        </>
    )
}