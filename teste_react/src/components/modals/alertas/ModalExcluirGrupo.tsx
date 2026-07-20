import { Button, Modal, Spinner } from "react-bootstrap"
import { deletarGrupo } from "../../../services/GrupoServise"
import { useState } from "react"
import { useData } from "../../../contexts/DataContext"
import { useToast } from "../../../contexts/ToastContext"
import axios from "axios"

interface ModalComponentProps {
    show: boolean
    grupoCodigo: number
    grupoDescricao: string
    onHide: () => void
}

export default function ModalExcluirGrupo({
    show,
    grupoCodigo,
    grupoDescricao,
    onHide
}: ModalComponentProps) {
    const { carregarGrupos } = useData()
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()


    async function excluirGrupo() {
    try {
        setLoading(true)

        await deletarGrupo(grupoCodigo)

        await carregarGrupos()

        showToast("Grupo excluído com sucesso!", "success")

        onHide()

    } catch (e) {

        if (axios.isAxiosError(e)) {
            showToast(
                e.response?.data?.error?.message ?? "Erro ao excluir grupo.",
                "danger"
            )
        } else {
            showToast("Erro inesperado ao excluir grupo.", "danger")
        }

    } finally {
        setLoading(false)
    }
}

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton />
                <Modal.Body className="modal-body-loading">
                    {loading && (
                        <div className="loading-overlay">
                            <Spinner animation="border" />
                        </div>
                    )}
                    <p>Deseja excluir o grupo "{grupoDescricao}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={excluirGrupo} disabled={loading}>Sim</Button>
                        <Button variant="secondary" onClick={onHide}>Não</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}