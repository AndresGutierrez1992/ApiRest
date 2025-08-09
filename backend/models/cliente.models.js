const { version } = require('mongoose');
const mongoose = require('../config/connection')

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
    }
});

const cliente = mongoose.model('cliente', esquemaCliente);

module.exports = cliente;