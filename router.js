const express = require('express');
const router = express.Router();

const controladorUsuario = require("./controller/usuario.controller")
const controladorProducto = require("./controller/producto.controller")
const controladorCliente = require("./controller/cliente.controller")

router.get('/usuarios', async (req, res, next)=>{
    try {
        const usuarios = controladorUsuario.obtenerUsuarios()
        req.usuarios=usuarios
        next()
    } catch (error) {
        next(err)
    }
});


router.post('/usuarios', controladorUsuario.crearUsuario);


router.put('/usuarios/:id', controladorUsuario.actualizarUsuario);


router.delete('/usuarios/:id', controladorUsuario.eliminarUsuario);




router.get('/productos', async (req, res, next) => {
    try {
      const productos = await controladorProducto.consultarProductos();
      req.productos = productos;
      next(); // Avanza hacia el index.js casi que no ahh
    } catch (err) {
      next(err);
    }
  });

router.post('/productos', controladorProducto.crearProducto);


router.put('/productos/:id', controladorProducto.actualizarProducto);


router.delete('/productos/:id', controladorProducto.eliminarProducto);



router.get('/clientes',async (req, res, next)=>{
    try {
        const clientes = controladorCliente.consultarClientes()
        req.clientes=clientes
        next()
    } catch (error) {
        next(err)
    }
    });

router.post('/clientes', controladorCliente.crearCliente);


router.put('/clientes/:id', controladorCliente.actualizarCliente);


router.delete('/clientes/:id', controladorCliente.eliminarCliente);

module.exports = router;
