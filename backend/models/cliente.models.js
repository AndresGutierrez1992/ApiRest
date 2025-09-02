const { version } = require('mongoose');
const mongoose = require('../config/connection');
const { validate } = require('./empleado.models');

const esquemaCliente = mongoose.Schema({

    correo: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
        lowercase: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        minLength: 6
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
},
{ versionKey: false }
);

const cliente = mongoose.model('cliente', esquemaCliente);

module.exports = cliente;