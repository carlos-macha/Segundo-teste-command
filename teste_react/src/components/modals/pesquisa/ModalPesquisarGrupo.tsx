import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { PlusCircle, Trash, PencilSquare, BoxArrowRight } from "react-bootstrap-icons"
import TableComponent from "../../table/TableComponent";
import { useEffect, useState } from "react";
import ModalCadastrarGrupo from "../cadastro/ModalCadastrarGrupo";
import "../Modal.css"
import type { Grupo } from "../../../models/Grupo";
import ModalExcluirGrupo from "../alertas/ModalExcluirGrupo";
import ModalEditarGrupo from "../editar/ModalEditarGrupo";
import { useData } from "../../../contexts/DataContext";
import { useToast } from "../../../contexts/ToastContext";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalPesquisarGrupo({ show, onHide }: ModalComponentProps) {

    const { grupos, loading } = useData()

    const [abrirModal, setAbrirModal] = useState({
        cadastrarGrupo: false,
        excluir: false,
        editar: false
    })

    const { showToast } = useToast()

    const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null)
    const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null)

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)


    useEffect(() => {
        if (show === false || modalAberta === true) {
            setLinhaSelecionada(null)
        }
    }, [show, modalAberta])

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    onHide()
                    setGrupoSelecionado(null)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className={modalAberta ? "modal-desativada" : ""}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Pesquisar grupos
                    </Modal.Title>
                </Modal.Header>
                <Row className="p-2">
                    <Col className="mb-3 d-flex gap-3">
                        <Button variant="primary"
                            onClick={() => setAbrirModal({ ...abrirModal, cadastrarGrupo: true })}
                        >
                            <PlusCircle className="me-2" />
                            Adicionar
                        </Button>
                        <Button variant="danger"
                            onClick={
                                () => {
                                    !grupoSelecionado ?
                                        showToast("Selecione um grupo antes.", "warning")
                                        :
                                        setAbrirModal({
                                            ...abrirModal,
                                            excluir: true
                                        })
                                }
                            }
                        >
                            <Trash className="me-2" />
                            Remover
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                !grupoSelecionado ?
                                    showToast("Selecione um grupo antes.", "warning")
                                    :
                                    setAbrirModal({
                                        ...abrirModal,
                                        editar: true
                                    })
                            }}
                        >
                            <PencilSquare className="me-2" />
                            Alterar
                        </Button>

                    </Col>
                    <Col className="d-flex justify-content-end">
                        <div>
                            <Button variant="danger"
                                onClick={onHide}
                            >
                                <BoxArrowRight className="me-2" />
                                sair
                            </Button>
                        </div>
                    </Col>
                </Row>
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
                                    setLinhaSelecionada(index)
                                    setGrupoSelecionado(grupos[index])
                                }}
                                linhaSelecionada={linhaSelecionada}
                                loading={loading}
                            ></TableComponent>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
            <ModalCadastrarGrupo
                show={abrirModal.cadastrarGrupo}
                onHide={() => setAbrirModal({ ...abrirModal, cadastrarGrupo: false })}
            />
            {grupoSelecionado && (
                <ModalExcluirGrupo
                    show={abrirModal.excluir}
                    onHide={() => {
                        setAbrirModal({ ...abrirModal, excluir: false })
                        setGrupoSelecionado(null)
                    }}
                    grupoCodigo={Number(grupoSelecionado?.CODIGO ?? 0)}
                    grupoDescricao={grupoSelecionado?.DESCRICAO ?? ""}
                />
            )}
            {grupoSelecionado && (
                <ModalEditarGrupo
                    show={abrirModal.editar}
                    onHide={() => {
                        setAbrirModal({ ...abrirModal, editar: false })
                        setGrupoSelecionado(null)
                    }}
                    grupo={grupoSelecionado}
                />
            )}
        </>
    )
}