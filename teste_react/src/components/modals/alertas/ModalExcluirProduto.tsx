import { Button, Modal } from "react-bootstrap"
import { deletarProduto } from "../../../services/ProdutoService"


interface ModalComponentProps {
    show: boolean
    produtoCodigo: number
    produtoDescricao: string
    onHide: () => void
}

export default function ModalExcluirProduto({
    show,
    produtoCodigo,
    produtoDescricao,
    onHide
}: ModalComponentProps) {

    async function excluirProduto() {
        try {
            await deletarProduto(produtoCodigo)
        } catch (e) {
            console.error(e)
        }
    }

    async function confirmarExclusão() {
        excluirProduto()
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
                <p>Deseja excluir o produto "{produtoDescricao}"</p>
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