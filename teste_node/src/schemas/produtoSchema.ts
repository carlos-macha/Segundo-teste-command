import { z } from "zod"

export const productSchema = z.object({

    descricao: z
        .string()
        .min(2, "Descrição deve ter no mínimo 3 caracteres"),

    codigo_grupo: z
        .number(),

    valor:
        z.number()
        .positive(
            "O valor deve ser maior que zero"
        ),
})