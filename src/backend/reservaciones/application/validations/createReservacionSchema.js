import { z } from "zod";

export const createReservacionSchema = z.object({
  pagoInicial: z
    .number()
    .refine((pago) => pago > 0, { message: "El monto debe ser mayor a 0" }),
  fechaLimite: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
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
        return inputDate >= todayDate;
      },
      { message: "La fecha debe ser posterior a la fecha actual" }
    ),
  comentario: z.string().optional(),
  cliente: z.discriminatedUnion("tipo", [
    z.object({
      tipo: z.literal("persona"),
      datos: z.object({
        // dni: z.string(),
        nombres: z
          .string()
          .min(3, "Los nombres deben tener al menos 3 caracteres")
          .max(100, "Máximo 100 caracteres"),
        apellidos: z
          .string()
          .min(3, "Los apellidos deben tener al menos 3 caracteres")
          .max(250, "Máximo 250 caracteres"),
        celular: z.string().optional(),
        email: z
          .string()
          .email({ message: "Ingrese un correo válido" })
          .optional(),
      }),
    }),
    z.object({
      tipo: z.literal("empresa"),
      datos: z.object({
        // ruc: z.string(),
        nombre: z
          .string()
          .min(3, "El nombre de la empresadebe tener al menos 3 caracteres")
          .max(100, "Máximo 100 caracteres"),
        celular: z.string().optional(),
        email: z
          .string()
          .email({ message: "Ingrese un correo válido" })
          .optional(),
      }),
    }),
  ]),
  moto: z.object({
    nombre: z
      .string()
      .min(3, "El nombre de la moto debe tener al menos 3 caracteres")
      .max(100, "Máximo 100 caracteres"),
    descripcion: z
      .string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(250, "Máximo 250 caracteres"),
    categoria: z.object({
      nombre: z
        .string()
        .min(3, "El nombre de la categoría debe tener al menos 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    }),
    marca: z.object({
      nombre: z
        .string()
        .min(3, "El nombre de la marca debe tener al menos 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    }),
  }),
});
