import { Button, Form, InputGroup } from "react-bootstrap";

interface InputComponentProps {
    text: string;
    value: string;
    type: "text" | "number";
    buttonText?: string;
    onClick?: () => void;
    rightText?: string;
    error?: string;
    bloqueado?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputComponent({
    text,
    value,
    type,
    onClick,
    buttonText,
    rightText,
    error,
    bloqueado,
    onChange
}: InputComponentProps) {
    return (
        <Form.Group className="mb-3">
    <InputGroup>
        <InputGroup.Text>
            {text}
        </InputGroup.Text>

        <Form.Control
            type={type}
            value={value}
            onChange={onChange}
            isInvalid={!!error}
            disabled={bloqueado}
        />

        {rightText && (
            <InputGroup.Text className="w-25 justify-content-start fw-bold">
                {rightText}
            </InputGroup.Text>
        )}

        {buttonText && (
            <Button
                variant="info"
                onClick={onClick}
            >
                {buttonText}
            </Button>
        )}

        {error && (
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        )}
    </InputGroup>
</Form.Group>   
    );
}