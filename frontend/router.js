const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const controladorEmpleado = require("../backend/controller/empleado.controller");
const controladorProducto = require("../backend/controller/producto.controller");
const controladorCliente = require("../backend/controller/cliente.controller");
const controladorRol = require("../backend/controller/rol.controller");
const requireAuth = require("../backend/middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/comida", (req, res) => {
  res.render("pages/comida");
});

router.get("/juguetes", (req, res) => {
  res.render("pages/juguetes");
});

router.get("/accesorios", (req, res) => {
  res.render("pages/accesorios");
});

router.get("/nosotros", (req, res) => {
  res.render("pages/nosotros");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});



// RUTAS EMPLEADO
router.get("/aggempleados",requireAuth.requireAuth, async (req, res) => {
  try {
    const empleados = await controladorEmpleado.obtenerEmpleados();
    res.render("pages/aggempleados", { empleados });
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).render("pages/error");
  }
});
router.post("/aggempleados",requireAuth.requireAuth,controladorEmpleado.crearEmpleado);
router.put("/aggempleados/:id",requireAuth.requireAuth, controladorEmpleado.actualizarEmpleado);
router.delete("/aggempleados/:id",requireAuth.requireAuth, controladorEmpleado.eliminarEmpleado);




// RUTAS PRODUCTOS
router.get("/aggproductos", requireAuth.requireAuth, async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos();
    console.log(productos);
    res.render("pages/aggproductos", { productos });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).render("pages/error");
  }
});
router.post("/aggproductos",requireAuth.requireAuth, controladorProducto.crearProducto);
router.put("/aggproductos/:id",requireAuth.requireAuth, controladorProducto.actualizarProducto);
router.delete("/aggproductos/:id",requireAuth.requireAuth, controladorProducto.eliminarProducto);




// RUTAS CLIENTES
router.get("/gestionClientes", requireAuth.requireAuth, async (req, res) => {
  try {
    const clientes = await controladorCliente.obtenerClientes();
    res.render("pages/gestionClientes", { clientes });
  } catch (error) {
    res.status(500).render("pages/error", { mensaje: "Error al cargar clientes" });
  }
});
router.post("/gestionClientesPublico",controladorCliente.crearCliente);
router.post("/gestionClientes",requireAuth.requireAuth,controladorCliente.crearCliente);
router.put("/gestionClientes/:id",requireAuth.requireAuth,controladorCliente.actualizarCliente);
router.delete("/gestionClientes/:id",requireAuth.requireAuth,controladorCliente.eliminarCliente);


router.get('/gestionRoles',requireAuth.requireAuth, async (req, res) => {
  try {
    const roles = await controladorRol.obtenerRoles();
    res.render("pages/gestionRoles", { roles });
  } catch (error) {
    res.status(500).render("pages/error", { mensaje: "Error al cargar roles" });
  }
});
router.post('/gestionRoles',requireAuth.requireAuth, controladorRol.crearRol);
router.get('/gestionRoles/:id',requireAuth.requireAuth, controladorRol.obtenerRolPorId);
router.put('/gestionRoles/:id',requireAuth.requireAuth, controladorRol.actualizarRol);
router.delete('/gestionRoles/:id',requireAuth.requireAuth, controladorRol.eliminarRol);



router.get("/login", (req, res) => {
  res.render("pages/login", {
    error: null,
    captchaSvg: req.session.captchaSvg || null,
  });
});

// Endpoint que genera el captcha
router.get("/v1/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 2,
    color: true,
    background: "#ccf2ff",
  });
  req.session.captcha = captcha.text;
  req.session.captchaSvg = captcha.data;
  res.type("svg");
  res.status(200).send(captcha.data);
});

// Procesar login (paso 1: captcha + credenciales)
router.post("/login", async (req, res) => {
  const { username, password, captcha } = req.body;

  // Validar captcha
  const captchaOk =
    captcha &&
    req.session.captcha &&
    captcha.toLowerCase() === req.session.captcha.toLowerCase();

  req.session.captcha = null;
  req.session.captchaSvg = null;

  if (!captchaOk) {
    const newCaptcha = svgCaptcha.create({
      size: 5,
      noise: 2,
      color: true,
      background: "#ccf2ff"
    });
    req.session.captcha = newCaptcha.text;
    req.session.captchaSvg = newCaptcha.data;
    return res.render("pages/login", {
      error: "Captcha incorrecto. Inténtalo de nuevo.",
      captchaSvg: newCaptcha.data,
    });
  }

  // Validar credenciales (ejemplo fijo)
  if (username === "admin" && password === "123456") {
    // Si ya tiene secret guardado en sesión, no volver a generar QR
    if (!req.session.twoFactorSecret) {
      const secret = speakeasy.generateSecret({ name: "MiAppSegura" });
      req.session.twoFactorSecret = secret.base32;

      // Generar QR solo la primera vez
      const qrDataUrl = await qrcode.toDataURL(secret.otpauth_url);
      return res.render("pages/2fa", {
        qrCode: qrDataUrl,
        error: null,
      });
    }

    // Si ya tiene secret, solo pedir el código
    return res.render("pages/2fa", {
      qrCode: null,
      error: null,
    });

  } else {
    const newCaptcha = svgCaptcha.create({
      size: 5,
      noise: 2,
      color: true,
      background: "#ccf2ff"
    });
    req.session.captcha = newCaptcha.text;
    req.session.captchaSvg = newCaptcha.data;
    return res.render("pages/login", {
      error: "Usuario o contraseña incorrectos.",
      captchaSvg: newCaptcha.data,
    });
  }
});




// Ruta /panel (defínela una sola vez y protégela)
router.get("/panel", requireAuth.requireAuth, async (req, res) => {
  try {
    const productos = await controladorProducto.obtenerProductos(); 
    const empleados = await controladorEmpleado.obtenerEmpleados();
    const clientes = await controladorCliente.obtenerClientes();  
    res.render("pages/panel", { productos, empleados, clientes });
  } catch (error) {
    console.error("Error al cargar el panel:", error);
    res.status(500).render("pages/error", { mensaje: "Error al cargar el panel" });
  }
});

// Verificación 2FA
router.post("/verify-2fa", (req, res) => {
  const { token } = req.body;
  const verified = speakeasy.totp.verify({
    secret: req.session.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (!verified) {
    return res.render("pages/2fa", {
      qrCode: null,
      error: "Código inválido, inténtalo de nuevo.",
    });
  }

  // Autenticar sesión y redirigir
  req.session.authenticated = true;
  return res.redirect("panel");
});


// Cerrar sesión
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("http://localhost:9090/v1"); // Redirige al landin después de cerrar sesión
  });
});

module.exports = router;