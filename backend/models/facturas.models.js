const mongoose = require("../config/connection");

const esquemaFactura = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cliente", // relación con Cliente
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ["pendiente", "pagada", "anulada"],
      default: "pendiente",
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "producto", // relación con Producto
          required: true,
        },
        cantidad: { type: Number, required: true, min: 1 },
        precio: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 },
      },
    ],
  },
  { versionKey: false }
);

const Factura = mongoose.model("factura", esquemaFactura);

module.exports = Factura;
