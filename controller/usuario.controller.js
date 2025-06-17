const modeloUsuario = require("../models/usuario.models");

exports.obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await modeloUsuario.find();
      res.status(200).json(usuarios);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).json({ error: "No se pudieron obtener los usuarios" });
    }
  };
  

exports.crearUsuario = async (req, res) => {
  const nuevoUsuario = new modeloUsuario({
    nombre: req.body.nombre,
    edad: req.body.edad,
    correo: req.body.correo
    
  });

  try {
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (err) {
    console.error("Error al guardar usuario:", err);
    res.status(500).json({ error: "No se pudo guardar el usuario" });
  }
};


exports.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  const datosActualizados = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    correo: req.body.correo
  };

  try {
    const usuarioActualizado = await modeloUsuario.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuarioActualizado);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};



exports.eliminarUsuario = async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const usuarioEliminado = await modeloUsuario.findByIdAndDelete(idUsuario);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente", usuario: usuarioEliminado });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};

