import { z } from "zod";

export const createGastoGeneralSchema = z.object({
  descripcion: z
    .string()
    .min(4, "La descripción debe tener al menos 4 caracteres")
    .max(350, "Máximo 350 caracteres"),

  fecha: z
    .union([z.date(), z.string()]) // Acepta tanto Date como string
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),

  monto: z
    .union([
      z.number({
        required_error: "Ingrese el precio de venta",
        invalid_type_error: "Debe ingresar un número válido",
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: "Ingrese un número válido para el precio de venta",
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === "string" ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val >= 0, {
      message: "El precio de venta debe ser un número mayor o igual a 0",
    }),
});
