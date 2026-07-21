import {
    Request,
    Response,
    NextFunction
} from "express"
import { ZodError } from "zod"

const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(error)

    if (error instanceof ZodError) {

        return res.status(400).json({
            error: {
                message: "Erro de validação.",
                issues: error.issues.map(issue => ({
                    campo: issue.path.join("."),
                    mensagem: issue.message
                }))
            }
        })
    }

    const status =
        error.status || 500

    const message =
        error.message || "Internal Server Error"

    return res.status(status).json({
        error: {
            message,
            stack:
                process.env.NODE_ENV === "development"
                    ? error.stack
                    : undefined,
        }
    })
}

export default errorHandler