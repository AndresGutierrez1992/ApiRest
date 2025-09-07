const modeloCliente = require("../models/cliente.models");
const log = require("../log"); // logger


// Crear cliente
exports.crearCliente = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // 1️Validar campos vacíos
    if (!correo || !contrasena) {
      return res.status(400).json({
        success: false,
        message: "El correo y la contraseña son obligatorios",
        timestamp: new Date().toISOString()
      });
    }

    // 2️Verificar si ya existe un cliente con ese correo
    const clienteExistente = await modeloCliente.findOne({ correo });
    if (clienteExistente) {
      return res.status(409).json({
        success: false,
        message: "El correo ya está registrado",
        timestamp: new Date().toISOString()
      });
    }

    // 3️Crear cliente nuevo
    const nuevoCliente = new modeloCliente({
      correo,
      contrasena,
    });

    await nuevoCliente.save();

    log(`Cliente creado: ${nuevoCliente.correo} (ID: ${nuevoCliente._id})`);

    return res.status(201).json({
      success: true,
      message: "Cliente registrado correctamente",
      cliente: {
        id: nuevoCliente._id,
        correo: nuevoCliente.correo,
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    log(`Error al crear cliente: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error interno al registrar el cliente",
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
};




//  Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await modeloCliente.find();
    log(` Se consultaron todos los clientes (total: ${clientes.length})`);
    return clientes;
  } catch (error) {
    log(` Error al obtener clientes: ${error.message}`);
      res.status(400).json({
      success: false,
      message: "Error al obtener clientes",
      details: error.message,
      timestamp: new Date().toISOString()
    });

  }
};

//  Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await modeloCliente.findById(req.params.id);
    if (!cliente) {
      log(` Cliente no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
        details: error.message,
        timestamp: new Date().toISOString()
      });

    }
    log(` Cliente consultado: ${cliente.correo} (ID: ${cliente._id})`);
    res.json(cliente);
  } catch (error) {
    log(` Error al obtener cliente: ${error.message}`);
        res.status(500).json({
        success: false,
        message: "Error al obtener el cliente",
        details: error.message,
        timestamp: new Date().toISOString()
      });
  }
};

//  Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await modeloCliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!clienteActualizado) {
      log(` No se pudo actualizar: cliente no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
    log(` Cliente actualizado: ${clienteActualizado.correo} (ID: ${clienteActualizado._id})`);
    res.json(clienteActualizado);
  } catch (error) {
    log(` Error al actualizar cliente: ${error.message}`);
        res.status(500).json({
        success: false,
        message: "Error al actualizar el cliente",
        details: error.message,
        timestamp: new Date().toISOString()
      });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await modeloCliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      log(` No se pudo eliminar: cliente no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
    log(`Cliente eliminado: ${clienteEliminado.correo} (ID: ${clienteEliminado._id})`);
    res.json({ mensaje: "Cliente eliminado", cliente: clienteEliminado });
  } catch (error) {
    log(` Error al eliminar cliente: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el cliente",
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
