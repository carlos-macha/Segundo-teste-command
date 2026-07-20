import { useState } from 'react';
import { NavDropdown, Container, Nav, Navbar } from 'react-bootstrap';
import ModalCadastrarGrupo from '../modals/cadastro/ModalCadastrarGrupo';
import ModalCadastrarProduto from '../modals/cadastro/ModalCadastrarProduto';
import ModalPesquisarGrupo from '../modals/pesquisa/ModalPesquisarGrupo';
import ModalPesquisarProduto from '../modals/pesquisa/ModalPesquisarProduto';
import ModalAlerta from '../modals/alertas/ModalAlerta';
import ModalAtualizarPreco from '../modals/atualizacao/ModalAtualizarPreco';

export default function NavbarComponent() {
    const [abrirModal, setAbrirModal] = useState({
        cadastrarGrupo: false,
        cadastrarProduto: false,
        pesquisarGrupo: false,
        pesquisarProduto: false,
        atualizarPreco: false,
        sair: false
    })

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <NavDropdown title="Cadastro" id="collapsible-nav-dropdown" className='text-white mx-3'>
                        <NavDropdown.Item
                            onClick={() => setAbrirModal({ ...abrirModal, cadastrarGrupo: true })}
                        >
                            Grupo
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={() => setAbrirModal({ ...abrirModal, cadastrarProduto: true })}
                        >
                            Produto
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="processos" id="collapsible-nav-dropdown" className='text-white mx-3'>
                        <NavDropdown.Item
                            onClick={() => setAbrirModal({ ...abrirModal, pesquisarGrupo: true })}
                        >
                            Pesquisar Grupo
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={() => setAbrirModal({ ...abrirModal, pesquisarProduto: true })}
                        >
                            Pesquisar Produto
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setAbrirModal({
                            ...abrirModal, atualizarPreco: true
                        })}
                        >Atualizar preço</NavDropdown.Item>
                    </NavDropdown>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setAbrirModal({
                            ...abrirModal, sair: true
                        })}>
                            Sair
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <ModalCadastrarGrupo
                show={abrirModal.cadastrarGrupo}
                onHide={() => setAbrirModal({ ...abrirModal, cadastrarGrupo: false })}
            />
            <ModalCadastrarProduto
                show={abrirModal.cadastrarProduto}
                onHide={() => setAbrirModal({ ...abrirModal, cadastrarProduto: false })}
            />
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
            <ModalAtualizarPreco
                show={abrirModal.atualizarPreco}
                onHide={() => setAbrirModal({ ...abrirModal, atualizarPreco: false })}
            />
        </>
    );
}