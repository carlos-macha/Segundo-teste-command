import { Card, Modal } from "react-bootstrap";
import TableComponent from "../../table/TableComponent";
import { useEffect, useState } from "react";
import "../Modal.css"
import ModalAlerta from "../alertas/ModalAlerta";
import type { Grupo } from "../../../models/Grupo";
import { getGrupos } from "../../../services/GrupoServise";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    onSelect: (grupo: Grupo) => void
}

export default function ModalSelecionarGrupo({ show, onHide, onSelect }: ModalComponentProps) {
    const [grupos, setGrupos] = useState<Grupo[]>([])

    const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null)

    const [abrirModal, setAbrirModal] = useState({
        grupoSelecionadoVazio: false,
    })

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    useEffect(() => {
        if (show) {
            carregarGrupos()
        }
    }, [show])

    async function carregarGrupos() {
        try {
            const data = await getGrupos()
            setGrupos(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={modalAberta ? "modal-desativada" : ""}>
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
                            ></TableComponent>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
            <ModalAlerta
                show={abrirModal.grupoSelecionadoVazio}
                onHide={() => setAbrirModal({ ...abrirModal, grupoSelecionadoVazio: false })}
                buttonConfirmar={() => setAbrirModal({ ...abrirModal, grupoSelecionadoVazio: false })}
                text="Selecione um grupo antes."
                textButtonConfirmar="Ok"
            />
        </>
    )
}