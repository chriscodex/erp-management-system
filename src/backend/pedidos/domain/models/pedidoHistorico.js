import { Schema, model, models } from 'mongoose';

const pedidoHistoricoSchema = new Schema(
  {
    code: {
      type: String,
      required: [
        true,
        'El code es requerido en el schema de pedidos históricos.',
      ],
    },
    modelo: {
      nombre: {
        type: String,
        required: [
          true,
          'El nombre del modelo es requerido en el schema de pedidos históricos.',
        ],
      },
      descripcion: {
        type: String,
        required: [
          false,
          'La descripcion del modelo es requerida en el schema de pedidos históricos.',
        ],
      },
      stockMinimo: {
        type: Number,
        required: [
          true,
          'La descripcion del modelo es requerida en el schema de pedidos históricos.',
        ],
      },
      marcaId: {
        type: Schema.Types.ObjectId,
        required: [
          true,
          'La descripcion del modelo es requerida en el schema de pedidos históricos.',
        ],
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        required: [
          true,
          'La descripcion del modelo es requerida en el schema de pedidos históricos.',
        ],
      },
    },
    moto: {
      nombre: {
        type: String,
        required: [
          true,
          'El nombre de la moto es requerido en el schema de pedidos históricos.',
        ],
      },
      descripcion: {
        type: String,
        required: [
          false,
          'La descripcion de la moto es requerida en el schema de pedidos históricos.',
        ],
      },
      caracteristicas: {
        motor: {
          type: String,
          required: false,
        },
        cilindrada: {
          type: String,
          required: false,
        },
        potencia: {
          type: String,
          required: false,
        },
        frenos: {
          type: String,
          required: false,
        },
        transmision: {
          type: String,
          required: false,
        },
        dimensiones: {
          type: String,
          required: false,
        },
        capacidadCombustible: {
          type: String,
          required: false,
        },
        suspension: {
          type: String,
          required: false,
        },
        colores: {
          type: String,
          required: false,
        },
      },
      cantidad: {
        type: Number,
        required: true,
      },
      importado: {
        type: String,
        required: [
          true,
          'Indicar si es importado es requerido en el schema de pedidos históricos',
        ],
        enum: ['si', 'no'],
      },
    },
    estadoPago: {
      type: String,
      required: true,
    },
    montoPagado: {
      type: Number,
      required: false,
    },
    montoTotal: {
      type: Number,
      required: true,
    },
    fechaPago: {
      type: Date,
      required: true,
    },
    comentario: {
      type: String,
      required: false,
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor',
      required: [
        true,
        'El proveedor es requerido en el schema de pedidos históricos.',
      ],
    },
    almacenId: {
      type: Schema.Types.ObjectId,
      ref: 'Almacen',
      required: [
        true,
        'El almacen es requerido en el schema de pedidos históricos.',
      ],
    },
    fechaLimite: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PedidoHistorico =
  models?.PedidoHistorico || model('PedidoHistorico', pedidoHistoricoSchema);
