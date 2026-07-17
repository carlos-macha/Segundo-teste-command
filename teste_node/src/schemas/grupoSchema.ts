import { z } from "zod"

export const groupSchema = z.object({
    descricao: z
        .string()
        .min(
            3,
            "Descrição deve ter no mínimo 3 caracteres"
        )
        .max(
            80,
            "Descrição deve ter no máximo 80 caracteres"
        )
})