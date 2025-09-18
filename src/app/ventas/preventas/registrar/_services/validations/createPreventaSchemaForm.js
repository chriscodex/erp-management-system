import { z } from 'zod';
const objectIdRegex = /^[a-f\d]{24}$/i;
export const createPreventaSchemaForm = z
  .object({
    //Cliente
    tipo: z.enum(['persona', 'empresa']),

    identificador: z.string().min(8, {
      message: 'El identificador debe tener al menos 8 caracteres',
    }),

    razonSocial: z.string().optional(),
    representanteLegal: z.string().optional(),

    apellidos: z.string().optional(),
    nombres: z.string().optional(),

    direccion: z.string().optional(),
    email: z.string().optional(),
    celular: z.string().optional(),
    //Sucursal

    sucursalId: z.string().regex(objectIdRegex).optional(),
    //Productos
    productos: z
      .array(
        z.object({
          _id: z.string().regex(objectIdRegex, {
            message: 'Debe ingresar un producto',
          }),
          code: z.string().length(13, 'El code debe tener 13 dígitos'),
          tipo: z.enum(['producto', 'moto']),
          descripcion: z.string(),
          nombre: z.string(),
          estado: z.any(),
          importado: z.enum(['si', 'no']).optional(),
          precioCompra: z.number().optional(),
          precioVenta: z.number({
            required_error: 'Ingrese el precio de venta',
            invalid_type_error: 'Debe ingresar un precio de venta',
          }),
          stock: z
            .number({
              required_error: 'Ingrese el stock',
              invalid_type_error: 'Debe ingresar un stock',
            })
            .optional(),
          stockMinimo: z
            .number({
              required_error: 'Ingrese el stock minimo',
              invalid_type_error: 'Debe ingresar un stock minimo',
            })
            .optional(),
          obsequio: z.enum(['si', 'no']).optional(),

          modeloId: z
            .object({
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
              }),
            })
            .optional(),

          caracteristicas: z
            .object({
              motor: z.string().optional(),
              cilindrada: z.string().optional(),
              potencia: z.string().optional(),
              frenos: z.string().optional(),
              transmision: z.string().optional(),
              dimensiones: z.string().optional(),
              capacidadCombustible: z.string().optional(),
              suspension: z.string().optional(),
              colores: z.string().optional(),
            })
            .optional(),

          cantidad: z
            .number({
              required_error: 'Ingrese la cantidad',
              invalid_type_error: 'Debe ingresar una cantidad',
            })
            .optional(),

          almacenId: z.object({
            _id: z.string().regex(objectIdRegex, {
              message: 'Debe ingresar un almacén',
            }),
            nombre: z.string(),
          }),
          categoryId: z
            .object({
              _id: z.string().regex(objectIdRegex, {
                message: 'Debe ingresar una categoría',
              }),
              nombre: z.string(),
            })
            .optional(),
          marcaId: z
            .object({
              _id: z.string().regex(objectIdRegex, {
                message: 'Debe ingresar una marca',
              }),
              nombre: z.string(),
            })
            .optional(),
          proveedorId: z.object({
            _id: z.string().regex(objectIdRegex, {
              message: 'Debe ingresar un proveedor',
            }),
            nombre: z.string(),
          }),
          unidades: z
            .array(
              z.object({
                _id: z.string().regex(objectIdRegex, {
                  message: 'Debe ingresar una unidad',
                }),
                code: z.string(),
                estado: z.enum([
                  'disponible',
                  'reparado',
                  'dañado',
                  'desaparecido',
                  'prevendido',
                  'taller',
                ]),
              }),
            )
            .optional(),
        }),
      )
      .min(1, 'Debe agregar al menos un producto'),
    comentarios: z.string().optional(),
    cotizacion: z.enum(['si', 'no']).optional(),
    fechaValidez: z.date().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    // Validación de identificador según tipo
    if (data.tipo === 'persona' && data.identificador.trim().length !== 8) {
      ctx.addIssue({
        path: ['identificador'],
        code: z.ZodIssueCode.custom,
        message: 'El DNI debe tener exactamente 8 dígitos.',
      });
    }

    if (data.tipo === 'empresa' && data.identificador.trim().length !== 11) {
      ctx.addIssue({
        path: ['identificador'],
        code: z.ZodIssueCode.custom,
        message: 'El RUC debe tener exactamente 11 dígitos.',
      });
    }
    // Campos requeridos para persona
    if (data.tipo === 'persona') {
      if (!data.nombres?.trim()) {
        ctx.addIssue({
          path: ['nombres'],
          code: z.ZodIssueCode.custom,
          message: 'El campo nombres es requerido para personas.',
        });
      }
      if (!data.apellidos?.trim()) {
        ctx.addIssue({
          path: ['apellidos'],
          code: z.ZodIssueCode.custom,
          message: 'El campo apellidos es requerido para personas.',
        });
      }
    }
    // Campos requeridos para empresa
    if (data.tipo === 'empresa') {
      if (!data.razonSocial?.trim()) {
        ctx.addIssue({
          path: ['razonSocial'],
          code: z.ZodIssueCode.custom,
          message: 'El campo razón social es requerido para empresas.',
        });
      }
      if (!data.representanteLegal?.trim()) {
        ctx.addIssue({
          path: ['representanteLegal'],
          code: z.ZodIssueCode.custom,
          message: 'El campo representante legal es requerido para empresas.',
        });
      }
      if (!data.direccion?.trim()) {
        ctx.addIssue({
          path: ['direccion'],
          code: z.ZodIssueCode.custom,
          message: 'El campo direccion es requerido para empresas.',
        });
      }
    }
    //Estado si tipo es producto o moto
    data.productos.forEach((producto, index) => {
      if (producto.tipo === 'producto') {
        if (producto.estado !== 'activo' && producto.estado !== 'inactivo') {
          ctx.addIssue({
            path: ['productos', index, 'estado'],
            code: z.ZodIssueCode.custom,
            message: "El estado debe ser 'activo' o 'inactivo' para productos.",
          });
        }
      }

      if (producto.tipo === 'moto') {
        const estado = producto.estado;
        if (
          typeof estado !== 'object' ||
          !estado ||
          ![
            'disponible',
            'prevendido',
            'dañado',
            'reparado',
            'desarmado',
          ].includes(estado.titulo)
        ) {
          ctx.addIssue({
            path: ['productos', index, 'estado'],
            code: z.ZodIssueCode.custom,
            message: 'El estado de una moto debe tener un título válido.',
          });
        }
      }
    });
  });
