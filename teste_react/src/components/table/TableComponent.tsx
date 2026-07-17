import { Table } from "react-bootstrap";
import "./TableComponent.css";

interface TableProps {
    headers: string[];
    dados: string[][];
    linhaSelecionada: number | null
    onRowSelect?: (index: number) => void
}

export default function TableComponent({ headers, dados, linhaSelecionada, onRowSelect }: TableProps) {

    return (
        <div id="table-wrapper">
            <Table striped hover className="mb-0">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {dados.map((linha, index) => (
                        <tr
                            key={index}
                            onClick={() => onRowSelect?.(index)}
                            className={linhaSelecionada === index ? "linha-selecionada" : ""}
                        >
                            {linha.map((celula, i) => (
                                <td key={i}>{celula}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}