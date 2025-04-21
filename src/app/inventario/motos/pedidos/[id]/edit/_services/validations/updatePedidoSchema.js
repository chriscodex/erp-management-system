import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const updatePedidoSchema = z.object({
  modeloId: z.string({
    required_error: "Debe elegir un modelo",
  }),
  moto: z.object({
    nombre: z
      .string()
      .min(1, {
        message: "El nombre debe tener al menos 1 caracter",
      })
      .max(50, {
        message: "El nombre debe tener menos de 50 caracteres",
      }),
    descripcion: z.string().optional(),
  }),
  estadoTitle: z.enum(["pendiente", "parcial", "completado"]),
  // montoPagado: z
  //   .union([
  //     z.number({
  //       required_error: "Ingrese el monto pagado",
  //       invalid_type_error: "Debe ingresar un número válido",
  //     }),
  //     z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
  //       message: "Ingrese un número válido para el monto pagado",
  //     }), // Permite números con decimales
  //   ])
  //   .transform((val) => (typeof val === "string" ? Number(val) : val)) // Convierte cadenas válidas a números
  //   .refine((val) => val >= 0, {
  //     message: "El monto pagado debe ser un número mayor o igual a 0",
  //   })
  //   .optional(),
  montoPagado: z
    .union([
      z.number(),
      z.string().refine((val) => val === "" || /^[0-9]*\.?[0-9]+$/.test(val), {
        message: "Ingrese un número válido para el monto pagado",
      }),
      z.null(),
    ])
    .transform((val) =>
      val === "" || val === undefined || val === null ? undefined : Number(val)
    )
    .refine((val) => val === undefined || val >= 0, {
      message: "El precio de venta debe ser un número mayor o igual a 0",
    })
    .optional(),
  montoTotal: z
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
  fechaPago: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "La fecha no es válida",
    }),
  comentario: z.string().optional(),
  proveedorId: z.string().regex(objectIdRegex, {
    message: "Debe elegir un proveedor",
  }),
  almacenId: z.string().regex(objectIdRegex, {
    message: "Debe elegir un almacen",
  }),
  importado: z.enum(["si", "no"]),
});
