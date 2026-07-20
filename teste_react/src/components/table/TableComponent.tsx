import { Spinner, Table } from "react-bootstrap";
import "./TableComponent.css";

interface TableProps {
    headers: string[]
    dados: string[][]
    linhaSelecionada?: number | null
    loading?: boolean
    onRowSelect?: (index: number) => void
}

export default function TableComponent({ headers, dados, loading = false, linhaSelecionada, onRowSelect }: TableProps) {

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
                    {loading ? (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-4">
                                <Spinner animation="border" />
                            </td>
                        </tr>
                    ) : (
                        dados.map((linha, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowSelect?.(index)}
                                className={linhaSelecionada === index ? "linha-selecionada" : ""}
                            >
                                {linha.map((celula, i) => (
                                    <td key={i}>{celula}</td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}