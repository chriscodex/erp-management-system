import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createPreventaSchema = z.object({
  clienteId: z.string().regex(objectIdRegex, {
    message: "Es necesario ingresar el cliente",
  }),
  code: z.string().length(13, 'El codigo debe tener 13 caracteres').optional(),
  fecha: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  usuario: z.object({
    id: z
      .string()
      .regex(objectIdRegex, {
        message: 'Usuario requerido en el schema de preventa',
      }),
    dni: z
      .string()
      .length(8, 'El DNI debe tener 8 dígitos'),
    nombres: z
      .string()
      .min(3, {
        message: 'Los nombres deben tener al menos 3 caracteres',
      })
      .max(50, {
        message: 'Los nombres no puede tener más de 50 caracteres',
      }),
    apellidos: z
      .string()
      .min(3, {
        message: 'Los apellidos deben tener al menos 3 caracteres',
      })
      .max(50, {
        message: 'Los apellidos no puede tener más de 50 caracteres',
      }),
  }),
  productos: z
    .array(
      z.object({
        code: z.string(),
        tipo: z.string(),
        descripcion: z.string(),
        nombre: z.string(),
        estado: z.enum(['disponible', 'dañado', 'reparado', 'desaparecido']),
        precioVenta: z.number({
          required_error: 'Ingrese el precio de venta',
          invalid_type_error: 'Debe ingresar un precio de venta',
        }),
        cantidad: z.number({
          required_error: 'Ingrese la cantidad',
          invalid_type_error: 'Debe ingresar una cantidad',
        }),

        almacenId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar un almacén',
          }),
          nombre: z.string(),
        }),
        categoryId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar una categoría',
          }),
          nombre: z.string(),
        }),
        marcaId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar una marca',
          }),
          nombre: z.string(),
        }),
        proveedorId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar una proveedor',
          }),
          nombre: z.string(),
        }),
        almacen: z.string(),
        category: z.string(),
        marca: z.string(),
        proveedor: z.string(),
        unitId: z.string().regex(objectIdRegex, {
          message: 'El id de la unidad es requerido',
        }),
        productId: z.string().regex(objectIdRegex, {
          message: 'El id del producto es requerido',
        }),
      }))
    .min(1, "Debe agregar al menos un producto"),
  obsequios: z.array(z.any()).optional(),
  cotizacion: z.enum(['si', 'no']),
  comentarios: z.string().optional(),
});
