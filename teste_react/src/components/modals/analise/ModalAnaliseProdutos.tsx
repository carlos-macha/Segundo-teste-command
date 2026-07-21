import { Card, Modal } from "react-bootstrap";
import TableComponent from "../../table/TableComponent";
import { useEffect, useState } from "react";
import "../Modal.css"
import type { RelatorioGrupo } from "../../../models/RelatorioGrupo";
import { gerarRealatorioDeGrupo } from "../../../services/RelatorioService";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalAnaliseProdutos({ show, onHide }: ModalComponentProps) {
    const [relatorioGrupo, setRelatorioGrupo] = useState<RelatorioGrupo[]>([])
    const [loading, setLoading] = useState(false)

    async function gerarRelatorio() {
        try {
            setLoading(true)
            const relatorio = await gerarRealatorioDeGrupo()
            setRelatorioGrupo(relatorio)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (show) gerarRelatorio()  
    }, [show])

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Análise de Produtos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Grupos
                            </Card.Title>
                            <TableComponent
                                headers={[
                                    "Código",
                                    "Descrição",
                                    "Qtd. Produtos",
                                    "Menor preço",
                                    "Maior preço",
                                    "Preço médio"
                                ]}
                                dados={relatorioGrupo.map(g => [
                                    String(g.CODIGO),
                                    String(g.DESCRICAO),
                                    String(g.QUANTIDADE_PRODUTOS ?? 0),
                                    String(g.MENOR_VALOR ?? 0),
                                    String(g.MAIOR_VALOR ?? 0),
                                    String(g.MEDIA_VALOR ?? 0)
                                ])}
                                loading={loading}
                            ></TableComponent>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
}