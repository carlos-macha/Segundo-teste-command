import { Button, Modal, Spinner } from "react-bootstrap"
import { deletarProduto } from "../../../services/ProdutoService"
import { useState } from "react"
import { useData } from "../../../contexts/DataContext"
import { useToast } from "../../../contexts/ToastContext"


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
    const {carregarProdutos} = useData()
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()

    async function excluirProduto() {
        try {
            setLoading(true)
            await deletarProduto(produtoCodigo)
            await carregarProdutos()
            showToast("Produto excluido com sucesso!", "success")
            onHide()
        } catch (e) {
            showToast("Erro ao excluir produto.", "danger")
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
                    <p>Deseja excluir o produto "{produtoDescricao}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={excluirProduto} disabled={loading}>Sim</Button>
                        <Button variant="secondary" onClick={onHide}>Não</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}