import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const updateOrdenServicioSchema = z.object({

  code: z.union([z.string(), z.number()]),
  cliente: z.object({
    clienteId: z
      .string()
      .regex(objectIdRegex, {
        message: 'Debe ingresar un cliente',
      }),
    tipo: z.enum(['persona', 'empresa']),
    datos: z.object({
      dni: z
        .string()
        .length(8, 'El DNI debe tener 8 dígitos')
        .optional(),
      nombres: z
        .string()
        .min(3, {
          message: 'Los nombres deben tener al menos 3 caracteres',
        })
        .max(50, {
          message: 'Los nombres no puede tener más de 50 caracteres',
        })
        .optional(),
      apellidos: z
        .string()
        .min(3, {
          message: 'Los apellidos deben tener al menos 3 caracteres',
        })
        .max(50, {
          message: 'Los apellidos no puede tener más de 50 caracteres',
        }).optional(),
      direccion: z
        .string()
        .min(3, {
          message: 'La dirección debe tener al menos 3 caracteres',
        }).optional(),
      email: z
        .string()
        .email({ message: 'Ingrese un correo válido' })
        .optional(),
      celular: z
        .string()
        .min(4, { message: 'El celular debe tener al menos 4 dígitos' })
        .optional(),
    }),
  }),
  moto: z.object({
    vin: z
      .string()
      .length(17, {
        message: 'El VIN debe tener 17 dígitos',
      })
      .optional(),
    placa: z
      .string()
      .optional(),
    nombre: z
      .string()
      .min(3, "El nombre de la moto debe tener al menos 3 caracteres")
      .max(100, "Máximo 100 caracteres")
      .optional(),
    descripcion: z
      .string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(250, "Máximo 250 caracteres")
      .optional(),
    categoria: z
      .string()
      .min(3, "El nombre de la marca debe tener al menos 3 caracteres")
      .max(20, "Máximo 20 caracteres")
      .optional(),
    marca: z
      .string()
      .min(3, "El nombre de la marca debe tener al menos 3 caracteres")
      .max(20, "Máximo 20 caracteres").optional(),
  }),
  mecanicos: z.array(
    z.object({
      dni: z.string()
        .length(8, 'El DNI debe tener 8 dígitos'),
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
    })
  ).min(1, "Debe asignar al menos un mecánico"),

  fechaIngreso: z
    .union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),

  origenServicio: z.enum(['garantia', 'pagado', 'interno'], {
    required_error: 'Seleccione un origen de servicio',
  }),
  tipoServicio: z.enum(['mantenimiento', 'reparacion'], {
    required_error: 'Seleccione un tipo de servicio',
  }),
  pago: z.object({
    montoAdelanto: z
      .union([
        z.number({
          required_error: "Ingrese el monto adelantado",
          invalid_type_error: "Debe ingresar un número válido",
        }),
        z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
          message: "Ingrese un número válido para el monto adelantado",
        }),
      ])
      .transform((val) => (typeof val === "string" ? Number(val) : val))
      .refine((val) => val >= 0, {
        message: "El monto adelantado debe ser un número mayor o igual a 0",
      }),
  }),

  comentarios: z.string().optional(),

  //Hasta aquí va bien

  //Mecánico
  fechaEntregaEstimada: z.union([z.date(), z.string()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)).optional(),
  estado: z.enum(['pendiente', 'diagnosticando', 'esperando-repuestos', 'en-reparacion', 'en-mantenimiento', 'finalizado', 'entregado'], {
    message: 'Debe ingresar un estado',
  }).optional(),
  productos: z.array(
    z.object({
      productId: z.any(),
      unitId: z.any(),
      code: z
        .string(),
      nombre: z
        .string()
        .min(1, {
          message: 'El nombre debe tener al menos 1 caracter',
        })
        .max(50, {
          message: 'El nombre debe tener menos de 50 caracteres',
        }),
      descripcion: z.string().optional(),
      estado: z.enum(['disponible',
        'dañado',
        'desaparecido',
        'reparado',
        'prevendido',], {
        message: 'Debe ingresar un estado',
      }),
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
            })
            .refine((val) => /^[0-9]+$/.test(val), {
              message: 'Ingrese el valor del stock',
            }),
        ])
        .transform((val) => (typeof val === 'string' ? Number(val) : val))
        .refine((val) => Number.isInteger(val) && val >= 1, {
          message: 'El stock debe ser un número entero mayor o igual a 1',
        }),
      cantidad: z.number({
        required_error: 'Cantidad es requerido',
        invalid_type_error: 'Debe ingresar un número valido',
      }),
      precioCompra: z
        .union([
          z.number({
            required_error: 'Ingrese el precio de compra',
            invalid_type_error: 'Debe ingresar un número válido',
          }),
          z.string().refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
            message: 'Ingrese un número válido para el precio de compra',
          }),
        ])
        .transform((val) => (typeof val === 'string' ? Number(val) : val))
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
          }),
        ])
        .transform((val) => (typeof val === 'string' ? Number(val) : val))
        .refine((val) => val >= 0, {
          message: 'El precio de venta debe ser un número mayor o igual a 0',
        }),
      inventario: z
      .enum(['existente', 'eliminado'], {
        message: 'Debe ingresar si el producto está o no en inventario',
      })
    }))
    .optional(),
  servicios: z.array(
    z.object({
      descripcion: z
        .string()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(100, "Máximo 100 caracteres"),
      fecha: z
        .union([z.date(), z.string()])
        .transform((val) => (typeof val === "string" ? new Date(val) : val)),
      precio: z.number({
        required_error: "Ingrese el precio",
        invalid_type_error: "Debe ingresar un número valido",
      }),
    })
  ).optional(),

  productosExternos: z.array(
    z.object({
      nombre: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "Máximo 100 caracteres"),
      descripcion: z
        .string()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(100, "Máximo 100 caracteres"),
      cantidad: z.number({
        required_error: "Ingrese la cantidad",
        invalid_type_error: "Debe ingresar un número valido",
      }),
      fecha: z
        .union([z.date(), z.string()])
        .transform((val) => (typeof val === "string" ? new Date(val) : val)),
    })
  ).optional(),

  comprobante: z.string(),
  counter: z.number().optional(),
  estadoSunat: z.string(),
  empresa: z.object({
    empresaId: z.string().regex(objectIdRegex, {
      message: 'Debe seleccionar una empresa',
    }),
    ruc: z.string().regex(/^\d{11}$/, 'El RUC debe tener 11 dígitos'),
    nombre: z
      .string()
      .min(3, {
        message: 'El nombre deben tener al menos 3 caracteres',
      })
      .max(150, {
        message: 'El nombre no puede tener más de 150 caracteres',
      }),
    descripcion: z
      .string()
      .min(3, {
        message: 'La descripción debe tener al menos 3 caracteres',
      })
      .max(250, {
        message: 'La descripción no puede tener más de 250 caracteres',
      }),
    direccion: z
      .string()
      .min(3, {
        message: 'La dirección debe tener al menos 3 caracteres',
      })
      .max(150, {
        message: 'La dirección no puede tener más de 150 caracteres',
      }),
    telefono: z
      .string()
      .min(4, { message: 'El teléfono debe tener al menos 4 dígitos' }),
    email: z.string().email({ message: 'Ingrese un correo válido' }),
  }).optional(),

});

