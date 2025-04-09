import { Schema, model, models } from "mongoose";

// Eliminar el modelo en caso no considere los cambios
// if (models.motoSchema) {
//   delete models.motoSchema;
// }

const motoSchema = new Schema(
  {
    estado: {
      titulo: {
        type: String,
        required: [true, "El estado es requerido en el schema de motos"],
        enum: ["disponible", "dañado", "reparado", "desarmado", "prevendido"],
      },
      observaciones: {
        type: String,
        required: false,
        maxlength: [500, "La observación no puede tener más de 500 caracteres"],
      },
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
<<<<<<< HEAD
      unique: true,
      required: [true, "El nombre es requerido en el schema de moto"],
=======
      unique: false,
      required: [true, 'El nombre es requerido en el schema de moto'],
>>>>>>> 12b40e9 (descontar stock v1.3 - motos se pueden agregar)
    },
    descripcion: {
      type: String,
      required: false,
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
    gastos: [
      {
        descripcion: {
          type: String,
          required: [true, "La descripción es requerida en el schema de motos"],
        },
        monto: {
          type: Number,
          required: [true, "El monto es requerido en el schema de motos"],
        },
        fecha: {
          type: Date,
          required: [true, "La fecha es requerida en el schema de motos"],
        },
      },
    ],
    precioCompra: {
      type: Number,
      required: [
        true,
        "El precio de compra es requerido en el schema de motos",
      ],
      min: [0, "El precio de compra no puede ser negativo"],
    },
    precioVenta: {
      type: Number,
      required: [true, "El precio de venta es requerido en el schema de motos"],
      min: [0, "El precio de venta no puede ser negativo"],
    },
    importado: {
      type: String,
      required: [
        true,
        "Indicar si es importado es requerido en el schema de motos",
      ],
      enum: ["si", "no"],
    },
    modeloId: {
      type: Schema.Types.ObjectId,
      ref: "Modelo",
      required: [true, "modeloId es requerido en el schema de motos"],
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: "Proveedor",
      required: [true, "proveedorId es requerido en el schema de motos"],
    },
    almacenId: {
      type: Schema.Types.ObjectId,
      ref: "Almacen",
      required: [true, "almacenId es requerido en el schema de motos"],
    },
  },
  {
    timestamps: true,
  }
);

// Index para mejorar búsquedas por nombre y modelo
// motoSchema.index({ code: 1 });
// motoSchema.index({ nombre: 1 });

export const Moto = models?.Moto || model("Moto", motoSchema);
