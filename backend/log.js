// logger.js
const fs = require("fs");
const path = require("path");

// Archivo de logs
const logFilePath = path.join(__dirname, "logs.txt");

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Agregar log al archivo (no sobrescribe, va sumando)
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Error escribiendo en el log:", err);
  });
}

module.exports = log;
