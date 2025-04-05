import { z } from "zod";

export const updateGastoGeneralSchema = z.object({
  descripcion: z
    .string()
    .min(4, "La descripción debe tener al menos 4 caracteres")
    .max(350, "Máximo 350 caracteres"),

  fecha: z
    .union([z.date(), z.string()]) // Acepta tanto Date como string
    .transform((val) => (typeof val === "string" ? new Date(val) : val)) // Convierte string a Date
    .refine(
      (date) => {
        const inputDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const today = new Date();
        const todayDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        return inputDate <= todayDate;
      },
      { message: "La fecha debe ser anterior o igual a la fecha actual" }
    ),

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
