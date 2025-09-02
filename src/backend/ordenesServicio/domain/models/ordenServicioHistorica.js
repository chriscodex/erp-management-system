import { Schema, model, models } from 'mongoose';

const ordenServicioHistoricaSchema = new Schema(
  {
    code: {
      type: String,
      required: [
        true,
        'El code es requerido en el schema de ordenes de servicio',
      ],
      unique: true,
    },
    cliente: {
      clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [
          true,
          'El id del cliente es requerido en el schema de ordenes de servicio',
        ],
      },
      tipo: {
        type: String,
        required: [true, 'El tipo es requerido en el schema de cliente'],
        enum: ['persona', 'empresa'],
      },
      datos: {
        type: Schema.Types.Mixed,
        required: [true, 'Los datos son requeridos en el schema de cliente'],
      },
    },
    moto: {
      vin: {
        type: String,
        required: false,
      },
      placa: {
        type: String,
        required: false,
      },
      nombre: {
        type: String,
        required: [
          false,
          'El nombre de la moto es requerido en el schema de ordenes de servicio',
        ],
      },
      descripcion: {
        type: String,
        required: false,
      },
      categoria: {
        type: String,
        required: false,
      },
      marca: {
        type: String,
        required: false,
      },
    },
    mecanicos: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: [
            true,
            'El id del mecánico es requerido en el schema de ordenes de servicio',
          ],
        },
        dni: {
          type: String,
          required: true,
        },
        nombres: {
          type: String,
          required: true,
        },
        apellidos: {
          type: String,
          required: true,
        },
      },
    ],
    fechaIngreso: {
      type: Date,
      required: [
        true,
        'La fecha de ingreso es requerida en el schema de ordenes de servicio',
      ],
    },
    origenServicio: {
      type: String,
      required: [
        true,
        'El tipo de servicio es requerido en el schema de ordenes de servicio',
      ],
      enum: ['garantia', 'pagado', 'interno'],
    },
    tipoServicio: {
      type: String,
      required: [
        true,
        'La categoría del servicio es requerido en el schema de ordenes de servicio',
      ],
      enum: ['mantenimiento', 'reparacion'],
    },
    productos: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [
            false,
            'El id del producto es requerido en el schema de ordenes de servicio',
          ],
        },
        unitId: {
          type: Schema.Types.ObjectId,
          ref: 'Unit',
          required: [
            false,
            'El id de la unidad es requerido en el schema de ordenes de servicio',
          ],
        },
        code: {
          type: String,
          required: true,
          index: true,
        },
        nombre: {
          type: String,
          required: false,
        },
        descripcion: {
          type: String,
          required: false,
        },
        estado: {
          type: String,
          required: [
            true,
            'El estado es requerido en el schema de ordenes de servicio',
          ],
          enum: [
            'disponible',
            'dañado',
            'desaparecido',
            'reparado',
            'prevendido',
          ],
        },
        stock: {
          type: Number,
          required: [
            true,
            'El stock es requerido en el schema de ordenes de servicio',
          ],
          min: [0, 'El stock no puede ser negativo'],
        },
        cantidad: {
          type: Number,
          required: false,
        },
        precioCompra: {
          type: Number,
          required: [
            true,
            'El precio de compra es requerido en el schema de ordenes de servicio',
          ],
          min: [0, 'El precio de compra no puede ser negativo'],
        },
        precioVenta: {
          type: Number,
          required: [
            true,
            'El precio de venta es requerido en el schema de ordenes de servicio',
          ],
          min: [0, 'El precio de venta no puede ser negativo'],
        },
        inventario: {
          type: String,
          enum: ['existente', 'eliminado'],
          required: [
            true,
            'El inventario es requerido en el schema de ordenes de servicio',
          ],
        },
      },
    ],
    pago: {
      montoEstimado: {
        type: Number,
        required: [
          false,
          'El monto estimado es requerido en el schema de ordenes de servicio',
        ],
        min: [0, 'El monto estimado no puede ser negativo'],
      },
      montoPagado: {
        type: Number,
        required: [
          false,
          'El monto pagado es requerido en el schema de ordenes de servicio',
        ],
        min: [0, 'El monto pagado no puede ser negativo'],
      },
      montoAdelanto: {
        type: Number,
        required: [
          true,
          'El monto de adelanto es requerido en el schema de ordenes de servicio',
        ],
        min: [0, 'El monto de adelanto no puede ser negativo'],
      },
    },
    //Mecánico
    fechaEntregaEstimada: {
      type: Date,
      required: [
        false,
        'La fecha de entrega estimada es requerida en el schema de ordenes de servicio',
      ],
    },
    estado: {
      type: String,
      required: [
        false,
        'El estado es requerido en el schema de ordenes de servicio',
      ],
      enum: [
        'pendiente',
        'diagnosticando',
        'esperando-repuestos',
        'en-reparacion',
        'en-mantenimiento',
        'finalizado',
        'entregado',
      ],
    },
    servicios: [
      {
        descripcion: {
          type: String,
          required: false,
        },
        fecha: {
          type: Date,
          required: false,
        },
        precio: {
          type: Number,
          required: false,
        },
      },
    ],
    productosExternos: [
      {
        nombre: {
          type: String,
          required: false,
        },
        descripcion: {
          type: String,
          required: false,
        },
        cantidad: {
          type: Number,
          required: false,
        },
        fecha: {
          type: Date,
          required: false,
        },
      },
    ],
    comprobante: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
    estadoSunat: {
      type: String,
      required: true,
    },
    empresa: {
      empresaId: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [
          false,
          'El id de la empresa es requerido en el schema de ordenes de servicio',
        ],
      },
      ruc: {
        type: String,
        required: [
          false,
          'El ruc de la empresa es requerido en el schema de ordenes de servicio',
        ],
      },
      nombre: {
        type: String,
        required: [
          false,
          'El nombre de la empresa es requerido en el schema de ordenes de servicio',
        ],
      },
      descripcion: {
        type: String,
        required: false,
      },
      direccion: {
        type: String,
        required: [false, 'La dirección es requerida en el schema de empresa'],
      },
      telefono: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const OrdenServicioHistorica =
  models?.OrdenServicioHistorica ||
  model('OrdenServicioHistorica', ordenServicioHistoricaSchema);
