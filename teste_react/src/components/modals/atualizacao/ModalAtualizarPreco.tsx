import { Modal } from "react-bootstrap"

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalAtualizarPreco({ show, onHide }: ModalComponentProps) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title>
                    Atualização de preço
                </Modal.Title>
            </Modal.Header>
        </Modal>
    )
}