import { Card, Modal } from "react-bootstrap";
import TableComponent from "../../table/TableComponent";
import { useState } from "react";
import "../Modal.css"
import type { Grupo } from "../../../models/Grupo";
import { useData } from "../../../contexts/DataContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    onSelect: (grupo: Grupo) => void
}

export default function ModalSelecionarGrupo({ show, onHide, onSelect }: ModalComponentProps) {

    const { grupos, loading } = useData()

    const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null)

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
                        Selecionar grupo
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
                                    "Descrição"
                                ]}
                                dados={grupos.map(g => [
                                    String(g.CODIGO),
                                    String(g.DESCRICAO)
                                ])}
                                onRowSelect={(index) => {
                                    const grupo = grupos[index]

                                    onSelect(grupo)
                                    setLinhaSelecionada(index)
                                    onHide()

                                }}
                                linhaSelecionada={linhaSelecionada}
                                loading={loading}
                            ></TableComponent>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
}