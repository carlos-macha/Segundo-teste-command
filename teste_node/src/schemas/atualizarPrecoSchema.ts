import { z } from "zod"

export const atualizarPrecoSchema = z.object({

    GRUPOS: z
        .array(z.number().int().positive())
        .min(1, "Selecione ao menos um grupo."),

    OPERACAO: z.enum(
        ["aumentar", "diminuir"],
        { message: "Operação deve ser 'aumentar' ou 'diminuir'." }
    ),

    PERCENTUAL: z
        .number()
        .positive("O percentual deve ser maior que zero.")
        .max(100, "O percentual não pode ser maior que 100."),
})