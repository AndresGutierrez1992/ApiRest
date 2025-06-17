const { version } = require('mongoose');
const mongoose = require('../config/connection')


const esquemaProducto = mongoose.Schema({
    nombre: String,
    precio:Number
    
},

{
    versionKey: false

}

);


const producto = mongoose.model('producto', esquemaProducto);

module.exports = producto;