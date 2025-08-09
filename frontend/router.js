const express = require("express");
const router = express.Router();

const controladorEmpleado = require("../backend/controller/empleado.controller");
const controladorProducto = require("../backend/controller/producto.controller");
const controladorCliente = require("../backend/controller/cliente.controller");
const controladorRol = require("../backend/controller/rol.controller");


router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/comida", (req, res) => {
  res.render("pages/comida");
});

router.get("/jugutes", (req, res) => {
  res.render("pages/juguetes");
});

router.get("/accesorios", (req, res) => {
  res.render("pages/accesorios");
});

router.get("/nosotros", (req, res) => {
  res.render("pages/nosotros");
});


router.get("/panel", async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos(); 
    const empleados = await controladorEmpleado.obtenerEmpleados();
    const clientes = await controladorCliente.obtenerClientes();  
    res.render("pages/panel", { productos, empleados, clientes }); // PASAMOS productos, empleados y clientes a EJS
  } catch (error) {
    console.error("Error al cargar el panel:", error);
    res.status(500).render("pages/error", { mensaje: "Error al cargar el panel" });
  }
});




// RUTAS EMPLEADO
router.get("/aggempleados", async (req, res) => {
  try {
    const empleados = await controladorEmpleado.obtenerEmpleados();
    res.render("pages/aggempleados", { empleados });
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).render("pages/error");
  }
});
router.post("/aggempleados", controladorEmpleado.crearEmpleado);
router.put("/aggempleados/:id", controladorEmpleado.actualizarEmpleado);
router.delete("/aggempleados/:id", controladorEmpleado.eliminarEmpleado);


// RUTAS PRODUCTOS
router.get("/aggproductos", async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos();
    console.log(productos);
    res.render("pages/aggproductos", { productos });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).render("pages/error");
  }
});


router.post("/aggproductos", controladorProducto.crearProducto);
router.put("/aggproductos/:id", controladorProducto.actualizarProducto);
router.delete("/aggproductos/:id", controladorProducto.eliminarProducto);


// RUTAS CLIENTES
router.get("/gestionClientes", async (req, res) => {
  try {
    const clientes = await controladorCliente.obtenerClientes();
    res.render("pages/gestionClientes", { clientes });
  } catch (error) {
    res.status(500).render("pages/error", { mensaje: "Error al cargar clientes" });
  }
});
router.post("/gestionClientes", controladorCliente.crearCliente);
router.put("/gestionClientes/:id", controladorCliente.actualizarCliente);
router.delete("/gestionClientes/:id", controladorCliente.eliminarCliente);


router.get('/gestionRoles', async (req, res) => {
  try {
    const roles = await controladorRol.obtenerRoles();
    res.render("pages/gestionRoles", { roles });
  } catch (error) {
    res.status(500).render("pages/error", { mensaje: "Error al cargar roles" });
  }
});
router.post('/gestionRoles', controladorRol.crearRol);
router.get('/gestionRoles/:id', controladorRol.obtenerRolPorId);
router.put('/gestionRoles/:id', controladorRol.actualizarRol);
router.delete('/gestionRoles/:id', controladorRol.eliminarRol);

module.exports = router;
