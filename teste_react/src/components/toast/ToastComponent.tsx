import { Toast, ToastContainer } from "react-bootstrap";

interface ToastComponentProps {
    show: boolean;
    onHide: () => void;
    mensagem: string;
    bg?: "success" | "danger" | "warning" | "info" | "primary" | "secondary";
}

export default function ToastComponent({
    show,
    onHide,
    mensagem,
    bg = "success"
}: ToastComponentProps) {
    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast
                show={show}
                onClose={onHide}
                delay={3000}
                autohide
                bg={bg}
            >
                <Toast.Body className="text-white">
                    {mensagem}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}