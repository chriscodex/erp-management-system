import { z } from "zod";

export const createGastoGeneralSchema = z.object({
  descripcion: z
    .string()
    .min(4, "La descripción debe tener al menos 4 caracteres")
    .max(350, "Máximo 350 caracteres"),

  fecha: z
    .union([z.date(), z.string()]) // Acepta tanto Date como string
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  monto: z.number({
    required_error: "Ingrese el precio de venta",
    invalid_type_error: "Debe ingresar un número válido",
  }),
});
