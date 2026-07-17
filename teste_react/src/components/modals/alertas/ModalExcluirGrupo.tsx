import { Button, Modal } from "react-bootstrap"
import { deletarGrupo } from "../../../services/GrupoServise"

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

    async function excluirGrupo() {
        try {
            await deletarGrupo(grupoCodigo)
        } catch (e) {
            console.error(e)
        }
    }

    async function confirmarExclusão() {
        excluirGrupo()
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <p>Deseja excluir o grupo "{grupoDescricao}"</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={confirmarExclusão}>Sim</Button>
                    <Button variant="secondary" onClick={onHide}>Não</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}