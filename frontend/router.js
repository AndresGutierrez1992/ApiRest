const express = require("express");
const router = express.Router();

const controladorUsuario = require("../backend/controller/usuario.controller");
const controladorProducto = require("../backend/controller/producto.controller");
const controladorCliente = require("../backend/controller/cliente.controller");

router.get("/usuarios", controladorUsuario.obtenerUsuarios);
router.post("/usuarios", controladorUsuario.crearUsuario);
router.put("/usuarios/:id", controladorUsuario.actualizarUsuario);
router.delete("/usuarios/:id", controladorUsuario.eliminarUsuario);

router.get("/productos", async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos();
    res.render("pages/productos", { productos});
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).render("pages/error");
  }
});

router.post("/productos", controladorProducto.crearProducto);
router.put("/productos/:id", controladorProducto.actualizarProducto);
router.delete("/productos/:id", controladorProducto.eliminarProducto);

router.get("/clientes", controladorCliente.obtenerClientes);
router.post("/clientes", controladorCliente.crearCliente);
router.put("/clientes/:id", controladorCliente.actualizarCliente);
router.delete("/clientes/:id", controladorCliente.eliminarCliente);

module.exports = router;
