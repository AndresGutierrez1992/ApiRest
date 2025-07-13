const { version } = require('mongoose');
const mongoose = require('../config/connection')

const esquemaCliente = new mongoose.Schema({
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Debe ser un correo válido"]
  },
  contrasena: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

const Cliente = mongoose.model("Cliente", esquemaCliente);

module.exports = Cliente;
