import { z } from "zod";

export const productZod = z.object({
    nome: z.string().nonempty("O nome é obrigatório"),
    preco: z.number().positive("O preço deve ser maior que zero"),
    quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
});
