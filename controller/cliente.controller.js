const modeloCliente = require("../models/cliente.models");

exports.obtenerClientes = async function (req, res) {
  try {
    const clientes = await modeloCliente.find();
    res.json(clientes);
  } catch (error) {
    console.error("Error al consultar clientes:", error);
    res.status(500).json({ error: "Error al consultar clientes" });
  }
};


exports.crearCliente = async (req, res) => {
  const nuevoCliente = new modeloCliente({
    correo: req.body.correo,
    contrasena: req.body.contrasena,
    fechaRegistro: new Date()
  });

  try {
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (err) {
    console.error("Error al guardar cliente:", err);
    res.status(500).json({ error: "No se pudo guardar el cliente" });
  }
};


exports.actualizarCliente = async (req, res) => {
  const id = req.params.id;
  const datosActualizados = {
    correo: req.body.correo,
    contrasena: req.body.contrasena
  };

  try {
    const clienteActualizado = await modeloCliente.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(clienteActualizado);
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
    res.status(500).json({ error: "No se pudo actualizar el cliente" });
  }
};


exports.eliminarCliente = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const clienteEliminado = await modeloCliente.findByIdAndDelete(idCliente);
    if (!clienteEliminado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente eliminado correctamente", cliente: clienteEliminado });
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    res.status(500).json({ error: "No se pudo eliminar el cliente" });
  }
};
