import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import ModalSelecionarGrupo from "../pesquisa/ModalSelecionarGrupo";
import type { Grupo } from "../../../models/Grupo";
import { editarProduto } from "../../../services/ProdutoService";
import type { Produto } from "../../../models/Produto";
import { pesquisarPeloCodigo } from "../../../services/GrupoServise";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
    produto: Produto
}

export default function ModalEditarProduto({ show, onHide, produto }: ModalComponentProps) {
    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false
    })

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null)

    const [form, setForm] = useState({
        codigo: String(produto.CODIGO),
        descricao: produto.DESCRICAO,
        valor: String(produto.VALOR)
    })

    const limparCampos = () => {
        setForm({
            ...form,
            descricao: "",
            valor: ""
        })
        setGrupoSelecionado(null)
    }

    const fecharModal = () => {
        limparCampos()
        onHide()
        setGrupoSelecionado(null)
    }

    useEffect(() => {
        if (show) handlePesquisarGrupo()
    }, [show])

    async function handleEditarProduto() {
        try {
            await editarProduto(produto.CODIGO, form.descricao, grupoSelecionado?.CODIGO!, Number(form.valor))
            limparCampos()
            fecharModal()
        } catch (e) {
            console.log(e)
        }
    }

    async function handlePesquisarGrupo() {
        try {
            const grupo = await pesquisarPeloCodigo(produto.CODIGO_GRUPO)
            setGrupoSelecionado(grupo)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={fecharModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={modalAberta ? "modal-desativada" : ""}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar produto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 d-flex gap-3">
                        <Button variant="primary"
                            onClick={handleEditarProduto}
                        >
                            Gravar
                        </Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>

                    <Row>
                        <Col md={5}>
                            <InputComponent
                                text="Código"
                                type="number"
                                value={form.codigo}
                                bloqueado={true}
                                onChange={() => {}}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <InputComponent
                                text="Descrição"
                                type="text"
                                value={form.descricao}
                                onChange={(e) => setForm({
                                    ...form,
                                    descricao: e.target.value
                                })}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <InputComponent
                                text="Grupo"
                                type="number"
                                value={grupoSelecionado ? String(grupoSelecionado.CODIGO) : ""}
                                rightText={grupoSelecionado ? grupoSelecionado.DESCRICAO : ""}
                                buttonText="Selecionar grupo"
                                bloqueado={true}
                                onClick={() => setAbrirModal({
                                    ...abrirModal, pesquisarGrupo: true
                                })}
                                onChange={() => { }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            <InputComponent
                                text="Valor"
                                type="number"
                                value={form.valor}
                                onChange={(e) => setForm({
                                    ...form,
                                    valor: e.target.value
                                })}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <ModalSelecionarGrupo
                show={abrirModal.pesquisarGrupo}
                onHide={() => setAbrirModal({ ...abrirModal, pesquisarGrupo: false })}
                onSelect={(grupo) => { setGrupoSelecionado(grupo) }}
            />
        </>
    )
}