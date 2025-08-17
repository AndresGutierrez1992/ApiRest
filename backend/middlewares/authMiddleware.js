// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: __dirname + '/../.env' });


const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
};

module.exports = { verificarToken, soloAdmin };
