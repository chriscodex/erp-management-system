import { z } from 'zod';

export const addGastoMotoSchema = z.object({
  descripcion: z.string().min(1, {
    message: 'La descripción debe tener al menos 1 caracter',
  }),
  monto: z
    .union([
      z.number({
        required_error: 'Ingrese el monto',
        invalid_type_error: 'Debe ingresar un monto válido',
      }),
      z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Ingrese un número válido para el monto del gasto',
      }), // Permite números con decimales
    ])
    .transform((val) => (typeof val === 'string' ? Number(val) : val)) // Convierte cadenas válidas a números
    .refine((val) => val > 0, {
      message: 'El monto debe ser un número mayor a 0',
    }),
});
