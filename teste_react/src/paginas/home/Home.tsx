import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import NavbarComponent from "../../components/Navbar/NavbarComponent"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Table, Hammer, Gear, BoxArrowRight } from "react-bootstrap-icons"
import FooterComponent from "../../components/footer/FooterComponent"
import ModalPesquisarGrupo from "../../components/modals/pesquisa/ModalPesquisarGrupo"
import ModalPesquisarProduto from "../../components/modals/pesquisa/ModalPesquisarProduto"
import ModalAlerta from "../../components/modals/alertas/ModalAlerta"

export default function Home() {
    const [abrirModal, setAbrirModal] = useState({
        pesquisarGrupo: false,
        pesquisarProduto: false,
        sair: false
    })

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarComponent />

            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row className="g-4">
                                    <Col xs={6} md="auto">
                                        <Button variant="primary"
                                            onClick={() => setAbrirModal({
                                                ...abrirModal, pesquisarGrupo: true
                                            })}
                                        >
                                            <Table className="me-2" />
                                            Grupos
                                        </Button>
                                    </Col>
                                    <Col xs={6} md="auto">
                                        <Button variant="primary"
                                            onClick={() => setAbrirModal({
                                                ...abrirModal, pesquisarProduto: true
                                            })}
                                        >
                                            <Hammer className="me-2" />
                                            Produtos
                                        </Button>
                                    </Col>
                                    <Col xs={6} md="auto">
                                        <Button variant="primary">
                                            <Gear className="me-2" />
                                            Atualização
                                        </Button>
                                    </Col>
                                    <Col xs={6} md="auto">
                                        <Button variant="primary" onClick={() => setAbrirModal({
                                            ...abrirModal, sair: true
                                        })}>
                                            <BoxArrowRight className="me-2" />
                                            Sair
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <FooterComponent />

            <ModalPesquisarGrupo
                show={abrirModal.pesquisarGrupo}
                onHide={() => setAbrirModal({ ...abrirModal, pesquisarGrupo: false })}
            />
            <ModalPesquisarProduto
                show={abrirModal.pesquisarProduto}
                onHide={() => setAbrirModal({ ...abrirModal, pesquisarProduto: false })}
            />
            <ModalAlerta
                show={abrirModal.sair}
                onHide={() => setAbrirModal({ ...abrirModal, sair: false })}
                buttonConfirmar={() => setAbrirModal({ ...abrirModal, sair: false })}
                text="Deseja sair do sistema?"
                textButtonConfirmar="Sim"
                textButtonRecusar="Não"
            />
        </div>

    )
}