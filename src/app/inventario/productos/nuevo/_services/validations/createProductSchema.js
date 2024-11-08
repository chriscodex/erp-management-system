import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i; // Expresión regular para el formato de ObjectId

export const createProductSchema = z.object({
  categoryId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir una categoría',
  }),
  marcaId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir una marca',
  }),
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre debe tener al menos 1 caracter',
    })
    .max(50, {
      message: 'El nombre debe tener menos de 50 caracteres',
    }),
  descripcion: z.string().optional(),
  stock: z.number().min(0, {
    message: 'El stock debe ser mayor o igual a 0',
  }),
  stockMinimo: z.number().min(0, {
    message: 'El stock minimo debe ser mayor o igual a 0',
  }),
  precioCompra: z.number().min(0, {
    message: 'El precio de compra debe ser mayor o igual a 0',
  }),
  precioVenta: z.number().min(0, {
    message: 'El precio de venta debe ser mayor o igual a 0',
  }),
  proveedorId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un proveedor',
  }),
  segmentId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un segmento',
  }),
  almacenId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un almacen',
  }),
});
