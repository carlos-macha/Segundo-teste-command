import { Button, Card, Modal } from "react-bootstrap";
import { useMemo } from "react";
import "../Modal.css";

import TableComponent from "../../table/TableComponent";
import ChipGrupo from "../../chip/ChipGrupo";

import type { Grupo } from "../../../models/Grupo";
import { useData } from "../../../contexts/DataContext";

interface ModalComponentProps {
    show: boolean;
    onHide: () => void;
    gruposSelecionados: Grupo[]
    onSelect: (grupos: Grupo[]) => void;
}

export default function ModalSelecionarVariosGrupos({
    show,
    onHide,
    gruposSelecionados,
    onSelect
}: ModalComponentProps) {

    const { grupos, loading } = useData();

    const gruposDisponiveis = useMemo(() => {
        return grupos.filter(
            grupo =>
                !gruposSelecionados.some(
                    selecionado => selecionado.CODIGO === grupo.CODIGO
                )
        );
    }, [grupos, gruposSelecionados]);

    function adicionarGrupo(grupo: Grupo) {
        if(gruposSelecionados.some(g => g.CODIGO === grupo.CODIGO)) return

        onSelect([
            ...gruposSelecionados,
            grupo
        ])
    }

    function removerGrupo(grupo: Grupo) {
        onSelect(
            gruposSelecionados.filter(
                g => g.CODIGO !== grupo.CODIGO
            )
        )
    }

    function fecharModal() {
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={fecharModal}
            size="lg"
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Selecionar grupos
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className="d-flex flex-wrap gap-2 mb-3">
                    {gruposSelecionados.map(grupo => (
                        <ChipGrupo
                            key={grupo.CODIGO}
                            grupo={grupo}
                            onRemove={() => removerGrupo(grupo)}
                        />
                    ))}
                </div>

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
                            dados={gruposDisponiveis.map(g => [
                                String(g.CODIGO),
                                g.DESCRICAO
                            ])}
                            loading={loading}
                            onRowSelect={(index) => {
                                adicionarGrupo(gruposDisponiveis[index]);
                            }}
                        />

                    </Card.Body>
                </Card>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="primary"
                    onClick={() => {
                        onSelect(gruposSelecionados)
                        fecharModal();
                    }}
                >
                    Confirmar
                </Button>

                <Button
                    variant="secondary"
                    onClick={fecharModal}
                >
                    Cancelar
                </Button>

            </Modal.Footer>

        </Modal>
    );
}