const { version } = require('mongoose');
const mongoose = require('../config/connection')

const esquemaRol = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
});

const rol = mongoose.model('rol', esquemaRol);

module.exports = rol;