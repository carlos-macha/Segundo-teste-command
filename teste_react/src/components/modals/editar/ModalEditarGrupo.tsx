import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import { editarGrupo } from "../../../services/GrupoServise";
import type { Grupo } from "../../../models/Grupo";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    grupo: Grupo
}

export default function ModalEditarGrupo({ show, grupo, onHide }: ModalComponentProps) {
    const [form, setForm] = useState({ codigo: String(grupo.CODIGO), descricao: grupo.DESCRICAO })
    const [error, setError] = useState({ codigo: "", descricao: "" })

    const limparCampos = () => {
        setForm({
            ...form,
            descricao: ""
        })
    }

    const limparErros = () => {
        setError({
            codigo: "",
            descricao: ""
        })
    }

    const fecharModal = () => {
        limparErros()
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
            await editarGrupo(grupo.CODIGO, form.descricao)
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
                    <Button variant="primary" onClick={handleEditarGrupo}>Gravar</Button>
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
    )
}