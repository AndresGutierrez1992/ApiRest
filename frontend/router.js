const express = require("express");
const router = express.Router();

const controladorUsuario = require("../backend/controller/usuario.controller");
const controladorProducto = require("../backend/controller/producto.controller");
const controladorCliente = require("../backend/controller/cliente.controller");

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await controladorUsuario.obtenerUsuarios();
    res.render("pages/usuarios", { usuarios });
  } catch (err) {
    console.error("Error al obtener usuarios:", { err: "Error al obtener usuarios" });
    res.status(500).render("pages/error");
  }
});

router.post("/usuarios", controladorUsuario.crearUsuario);
router.put("/usuarios/:id", controladorUsuario.actualizarUsuario);
router.delete("/usuarios/:id", controladorUsuario.eliminarUsuario);

router.get("/productos", async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos();
    res.render("pages/productos", { productos});
  } catch (err) {
    console.error("Error al obtener productos:", {err :"Error al obtener productos"});
    res.status(500).render("pages/error");
  }
});

router.post("/productos", controladorProducto.crearProducto);
router.put("/productos/:id", controladorProducto.actualizarProducto);
router.delete("/productos/:id", controladorProducto.eliminarProducto);

router.get("/clientes", async (req, res) => {
  try {
    const clientes = await controladorCliente.obtenerClientes();
    res.render("pages/clientes", { clientes });
  } catch (err) {
    console.error("Error al obtener clientes:", { err: "Error al obtener clientes" });
    res.status(500).render("pages/error");
  }
});

router.post("/clientes", controladorCliente.crearCliente);
router.put("/clientes/:id", controladorCliente.actualizarCliente);
router.delete("/clientes/:id", controladorCliente.eliminarCliente);

module.exports = router;
