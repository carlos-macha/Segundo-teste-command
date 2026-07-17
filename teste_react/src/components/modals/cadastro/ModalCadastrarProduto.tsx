import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputComponent from "../../input/InputComponent";
import ModalSelecionarGrupo from "../pesquisa/ModalSelecionarGrupo";
import type { Grupo } from "../../../models/Grupo";
import { criarProduto } from "../../../services/ProdutoService";

interface ModalComponentProps {
    show: boolean
    onHide: () => void
}

export default function ModalCadastrarProduto({ show, onHide }: ModalComponentProps) {
    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false
    })

    const modalAberta = Object.values(abrirModal).some(valor => valor === true)

    const [ grupoSelecionado, setGrupoSelecionado ] = useState<Grupo | null>(null)

    const [form, setForm] = useState({ descricao: "", valor: "" })

    const limparCampos = () => {
        setForm({
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

    async function handleCriarProduto() {
        try {
            await criarProduto(form.descricao, grupoSelecionado?.CODIGO!, Number(form.valor))
            limparCampos()
            fecharModal()
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
                        Cadastro de Produtos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 d-flex gap-3">
                        <Button variant="primary"
                            onClick={handleCriarProduto}
                        >
                            Gravar
                        </Button>
                        <Button variant="danger" onClick={limparCampos}>Cancelar</Button>
                    </div>
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
                                onChange={() => {}}
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
                onSelect={(grupo) => {setGrupoSelecionado(grupo)}}
            />
        </>
    )
}