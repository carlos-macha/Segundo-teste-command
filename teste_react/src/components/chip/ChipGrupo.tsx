import { Badge, CloseButton } from "react-bootstrap";
import type { Grupo } from "../../models/Grupo";
import "./Chip.css"

interface ChipGrupoProps {
    grupo: Grupo;
    onRemove?: (codigo: number) => void;
}

export default function ChipGrupo({
    grupo,
    onRemove
}: ChipGrupoProps) {

    return (
        <Badge
            bg="primary"
            className="chip-grupo"
        >
            {grupo.DESCRICAO}

            <CloseButton
                variant="white"
                onClick={() => onRemove?.(grupo.CODIGO)}
            />
        </Badge>
    );
}