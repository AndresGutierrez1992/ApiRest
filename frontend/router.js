const express = require("express");
const router = express.Router();

const controladorEmpleado = require("../backend/controller/empleado.controller");
const controladorProducto = require("../backend/controller/producto.controller");
const controladorCliente = require("../backend/controller/cliente.controller");

router.get("/usuarios", controladorUsuario.obtenerUsuarios);
router.post("/usuarios", controladorUsuario.crearUsuario);
router.put("/usuarios/:id", controladorUsuario.actualizarUsuario);
router.delete("/usuarios/:id", controladorUsuario.eliminarUsuario);


// RUTAS PRODUCTOS
router.get("/aggproductos", async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos();
    console.log(productos);
    res.render("pages/aggproductos", { productos });
  } catch (err) {
    console.error("Error al obtener productos:", {err :"Error al obtener productos"});
    res.status(500).render("pages/error");
  }
});


router.post("/aggproductos", controladorProducto.crearProducto);
router.put("/aggproductos/:id", controladorProducto.actualizarProducto);
router.delete("/aggproductos/:id", controladorProducto.eliminarProducto);

router.get("/clientes", controladorCliente.obtenerClientes);
router.post("/clientes", controladorCliente.crearCliente);
router.put("/clientes/:id", controladorCliente.actualizarCliente);
router.delete("/clientes/:id", controladorCliente.eliminarCliente);

module.exports = router;
