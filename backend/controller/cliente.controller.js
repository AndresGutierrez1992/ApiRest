const modeloCliente = require("../models/cliente.models");
const log = require("../log"); //  Importamos el logger

// Crear cliente (Admin)
exports.crearCliente = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;

    const nuevoCliente = new modeloCliente({
      correo,
      contrasena,
      rol: rol || "cliente"
    });

    await nuevoCliente.save();

    log(` Cliente creado (Admin): ${nuevoCliente.correo} (ID: ${nuevoCliente._id}, Rol: ${nuevoCliente.rol})`);

    res.status(201).json({ mensaje: "Cliente registrado correctamente", cliente: nuevoCliente });
  } catch (error) {
    log(` Error al crear cliente (Admin): ${error.message}`);
    res.status(400).json({ mensaje: "Error al registrar cliente", error: error.message });
  }
};

//  Crear cliente público (registro desde la página)
exports.crearClientePublico = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;

    const nuevoCliente = new modeloCliente({
      correo,
      contrasena,
      rol: rol || "cliente"
    });

    await nuevoCliente.save();

    log(` Cliente registrado desde la web: ${nuevoCliente.correo} (ID: ${nuevoCliente._id})`);

    res.status(201).json({ mensaje: "Cliente registrado correctamente", cliente: nuevoCliente });
  } catch (error) {
    log(` Error al registrar cliente público: ${error.message}`);
    res.status(400).json({ mensaje: "Error al registrar cliente", error: error.message });
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
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

//  Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await modeloCliente.findById(req.params.id);
    if (!cliente) {
      log(` Cliente no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    log(` Cliente consultado: ${cliente.correo} (ID: ${cliente._id})`);
    res.json(cliente);
  } catch (error) {
    log(` Error al obtener cliente: ${error.message}`);
    res.status(500).json({ error: "Error al obtener cliente" });
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
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    log(` Cliente actualizado: ${clienteActualizado.correo} (ID: ${clienteActualizado._id})`);
    res.json(clienteActualizado);
  } catch (error) {
    log(` Error al actualizar cliente: ${error.message}`);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await modeloCliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      log(` No se pudo eliminar: cliente no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    log(`Cliente eliminado: ${clienteEliminado.correo} (ID: ${clienteEliminado._id})`);
    res.json({ mensaje: "Cliente eliminado", cliente: clienteEliminado });
  } catch (error) {
    log(` Error al eliminar cliente: ${error.message}`);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
