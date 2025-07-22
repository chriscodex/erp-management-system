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
  sucursalId: z
    .string()
    .regex(objectIdRegex, {
      message: 'Debe ingresar una sucursal',
    }).optional(),
  productos: z
    .array(
      z.object({
        code: z.string().length(13, 'El code debe tener 13 dígitos'),
        tipo: z.enum(['producto', 'moto']),
        descripcion: z.string(),
        nombre: z.string(),
        estado: z.any(),
        precioCompra: z.number().optional(),
        precioVenta: z.number({
          required_error: 'Ingrese el precio de venta',
          invalid_type_error: 'Debe ingresar un precio de venta',
        }),
        modeloId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar un modelo',
          }),
          nombre: z.string(),
          categoryId: z.object({
            _id: z.string().regex(objectIdRegex, {
              message: 'Debe ingresar una categoría',
            }),
            nombre: z.string(),
          }),
          marcaId: z.object({
            _id: z.string().regex(objectIdRegex, {
              message: 'Debe ingresar una marca',
            }),
            nombre: z.string(),
          })
        }).optional(),

        caracteristicas: z.object({
          motor: z.string().optional(),
          cilindrada: z.string().optional(),
          potencia: z.string().optional(),
          frenos: z.string().optional(),
          transmision: z.string().optional(),
          dimensiones: z.string().optional(),
          capacidadCombustible: z.string().optional(),
          suspension: z.string().optional(),
          colores: z.string().optional(),
        }).optional(),

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
        }).optional(),
        marcaId: z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar una marca',
          }),
          nombre: z.string(),
        }).optional(),
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
        }).optional(),
        productId: z.string().regex(objectIdRegex, {
          message: 'El id del producto es requerido',
        }).optional(),
      }))
    .min(1, "Debe agregar al menos un producto"),
  obsequios: z.array(z.any()).optional(),
  cotizacion: z.enum(['si', 'no']),
  comentarios: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validación de estado
  //Estado si tipo es producto o moto
  data.productos.forEach((producto, index) => {
    if (producto.tipo === "producto") {
      if (
        !["disponible", "dañado", "reparado", "desaparecido", "taller"].includes(producto.estado)
      ) {
        ctx.addIssue({
          path: ["productos", index, "estado"],
          code: z.ZodIssueCode.custom,
          message: "El estado del producto no es válido.",
        });
      }
    }

    if (producto.tipo === "moto") {
      const estado = producto.estado;
      if (
        typeof estado !== "object" ||
        !estado ||
        !["disponible", "dañado", "reparado", "desarmado"].includes(estado.titulo)
      ) {
        ctx.addIssue({
          path: ["productos", index, "estado"],
          code: z.ZodIssueCode.custom,
          message: "El estado de una moto debe tener un título válido.",
        });
      }
    }
  });
});
