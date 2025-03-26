import { z } from "zod";

export const updateReservacionSchema = z.object({
  pagoInicial: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Debe ser un número válido con hasta 2 decimales"
    )
    .transform(Number)
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
      { message: "La fecha debe ser anterior o igual a la fecha actual" }
    ),
  comentario: z
    .string()
    .min(3, {
      message: "El comentario debe de tener al menos 3 caracteres",
    })
    .max(250, {
      message: "El comentario no debe tener más de 250 caracteres",
    }).optional(),
//   cliente: z.object({
//     tipo: z.enum(["persona", "empresa"]),
//     datos: z.object({
//         dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
//         nombres: z.string().min(3, "Los nombres deben tener al menos 3 caracteres").max(50, "Los nombres no pueden tener más de 50 caracteres"),
//         apellidos: z.string().min(3, "Los apellidos deben tener al menos 3 caracteres").max(50, "Los apellidos no pueden tener más de 50 caracteres"), 
//         celular: z.string().regex(/^9\d{8}$/, {
//             message: "El número de celular debe tener 9 dígitos y comenzar con 9",
//           }),
//         email: z.string().email({message: 'Ingrese un correo válido' }),

//         ruc: z.string().length(11, "El RUC debe tener 11 dígitos"),
//     }), 
//   }),

cliente: z.discriminatedUnion("tipo", [
    z.object({
      tipo: z.literal("persona"),
      datos: z.object({
        dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
        nombres: z.string().min(3, "Los nombres deben tener al menos 3 caracteres").max(50, "Máximo 100 caracteres"),
        apellidos: z.string().min(3, "Los apellidos deben tener al menos 3 caracteres").max(250, "Máximo 250 caracteres"),
        celular: z.string().regex(/^9\d{8}$/, { message: "El número de celular debe tener 9 dígitos y comenzar con 9" }),
        email: z.string().email({ message: "Ingrese un correo válido" }),
      }),
    }),
    z.object({
      tipo: z.literal("empresa"),
      datos: z.object({
        ruc: z.string().length(11, "El RUC debe tener 11 dígitos"),
        nombre: z.string().min(3, "El nombre de la empresadebe tener al menos 3 caracteres").max(100, "Máximo 100 caracteres"),
        celular: z.string().regex(/^9\d{8}$/, { message: "El número de celular debe tener 9 dígitos y comenzar con 9" }),
        email: z.string().email({ message: "Ingrese un correo válido" }),
      }),
    }),
  ]),

  moto: z.object({
    nombre: z.string().min(3, "El nombre de la moto debe tener al menos 3 caracteres").max(100, "Máximo 100 caracteres"),
    descripcion: z.string().min(3, "La descripción debe tener al menos 3 caracteres").max(250, "Máximo 250 caracteres"),
    categoria: z.object({
        nombre: z.string().min(3, "El nombre de la categoría debe tener al menos 3 caracteres").max(20, "Máximo 20 caracteres"),
    }),
    marca: z.object({
        nombre: z.string().min(3, "El nombre de la marca debe tener al menos 3 caracteres").max(20, "Máximo 20 caracteres"),
    }),
  }),
});