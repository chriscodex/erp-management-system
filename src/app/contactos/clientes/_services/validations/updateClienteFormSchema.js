import { z } from "zod";

export const updateClienteFormSchema = z.object({
  tipo: z.enum(["persona", "empresa"]),
  identificador: z
    .string()
    .min(8, "El identificador debe de tener al menos 8 caracteres"),
  razonSocial: z.string().optional(),
  representanteLegal: z.string().optional(),

  apellidos: z.string().optional(),
  nombres: z.string().optional(),

  direccion: z.string().optional(),
  email: z.string().optional(),
  celular: z.string().optional(),
});
