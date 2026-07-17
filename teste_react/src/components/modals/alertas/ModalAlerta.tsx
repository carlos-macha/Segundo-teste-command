import { Button, Modal } from "react-bootstrap"

interface ModalComponentProps {
    show: boolean
    text: string
    textButtonConfirmar: string
    textButtonRecusar?: string
    buttonConfirmar: () => void
    onHide: () => void
}

export default function ModalAlerta({
    show,
    text,
    textButtonConfirmar,
    textButtonRecusar,
    buttonConfirmar,
    onHide
}: ModalComponentProps) {

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
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={buttonConfirmar}>{textButtonConfirmar}</Button>
                    {textButtonRecusar && (
                        <Button variant="secondary" onClick={onHide}>{textButtonRecusar}</Button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    )
}