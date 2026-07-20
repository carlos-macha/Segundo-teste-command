import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import ToastComponent from "../components/toast/ToastComponent";

type ToastColor =
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "primary"
    | "secondary";

interface ToastContextType {
    showToast: (
        mensagem: string,
        bg?: ToastColor
    ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function ToastProvider({ children }: Props) {

    const [toast, setToast] = useState({
        show: false,
        mensagem: "",
        bg: "success" as ToastColor
    });

    function showToast(
        mensagem: string,
        bg: ToastColor = "success"
    ) {
        setToast({
            show: true,
            mensagem,
            bg
        });
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <ToastComponent
                show={toast.show}
                onHide={() =>
                    setToast({
                        ...toast,
                        show: false
                    })
                }
                mensagem={toast.mensagem}
                bg={toast.bg}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {

    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast deve ser usado dentro de um ToastProvider."
        );
    }

    return context;
}