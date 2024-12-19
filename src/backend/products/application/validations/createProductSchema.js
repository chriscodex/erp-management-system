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
  stock: z
    .union([
      z.number({
        required_error: 'Stock es requerido',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z
        .string()
        .min(1, {
          message: 'El stock debe ser un número entero mayor o igual a 1',
        }) // Evita cadenas vacías
        .refine((val) => /^[0-9]+$/.test(val), {
          message: 'Ingrese el valor del stock',
        }), // Asegura que no haya signos
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => Number.isInteger(val) && val >= 1, {
      message: 'El stock debe ser un número entero mayor o igual a 1',
    }),
  stockMinimo: z
    .union([
      z.number({
        required_error: 'Stock minimo es requerido',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]+$/.test(val), {
        message: 'Ingrese el valor del stock minimo',
      }), // Asegura que no haya signos
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: 'El stock debe ser un número mayor o igual a 0',
    }),
  precioCompra: z
    .union([
      z.number({
        required_error: 'Ingrese el precio de compra',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el precio de compra',
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val >= 0, {
      message: 'El precio de compra debe ser un número mayor o igual a 0',
    }),
  precioVenta: z
    .union([
      z.number({
        required_error: 'Ingrese el precio de venta',
        invalid_type_error: 'Debe ingresar un número válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el precio de venta',
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val >= 0, {
      message: 'El precio de venta debe ser un número mayor o igual a 0',
    }),
  obsequio: z.enum(['si', 'no']),
  importado: z.enum(['si', 'no']),
  proveedorId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un proveedor',
  }),
  almacenId: z.string().regex(objectIdRegex, {
    message: 'Debe elegir un almacen',
  }),
});
