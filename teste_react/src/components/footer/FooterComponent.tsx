import { Col, Container, Row } from "react-bootstrap";

export default function FooterComponent() {
    const dataAtual = new Date()

    return (
        <>
            <footer className="mt-auto bg-primary text-white py-1">
                <Container fluid>
                    <Row className="justify-content-between">
                        <Col>
                            <p>Command Perfect</p>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <div className="d-flex gap-5">
                                <p>Usuário:</p>
                                <p>{dataAtual.toLocaleDateString("pt-BR")}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}