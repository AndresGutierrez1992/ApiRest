const modeloCliente = require("../models/cliente.models");

//  Crear cliente
exports.crearCliente = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;

    const nuevoCliente = new modeloCliente({
      correo,
      contrasena,
      rol: rol || "cliente" 
    });

    await nuevoCliente.save();
    res.status(201).json({ mensaje: "Cliente registrado correctamente", cliente: nuevoCliente });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar cliente", error: error.message });
  }
};


exports.crearClientePublico = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;

    const nuevoCliente = new modeloCliente({
      correo,
      contrasena,
      rol: rol || "cliente" 
    });

    await nuevoCliente.save();
    res.status(201).json({ mensaje: "Cliente registrado correctamente", cliente: nuevoCliente });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar cliente", error: error.message });
  }
};



//  Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await modeloCliente.find();
    return clientes;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await modeloCliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
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
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(clienteActualizado);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await modeloCliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente eliminado", cliente: clienteEliminado });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
