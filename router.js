const express = require('express');
const router = express.Router();

const controladorUsuario = require("./controller/usuario.controller")
const controladorProducto = require("./controller/producto.controller")
const controladorCliente = require("./controller/cliente.controller")

router.get('/',controladorUsuario.obtenerUsuarios);

router.post('/usuarios', controladorUsuario.crearUsuario);


router.put('/usuarios/:id', controladorUsuario.actualizarUsuario);


router.delete('/usuarios/:id', controladorUsuario.eliminarUsuario);




router.get('/',controladorProducto.consultar);

router.post('/productos', controladorProducto.crearProducto);


router.put('/productos/:id', controladorProducto.actualizarProducto);


router.delete('/productos/:id', controladorProducto.eliminarProducto);



router.get('/',controladorCliente.consultar);

router.post('/clientes', controladorCliente.crearCliente);


router.put('/clientes/:id', controladorCliente.actualizarCliente);


router.delete('/clientes/:id', controladorCliente.eliminarCliente);

module.exports = router;
