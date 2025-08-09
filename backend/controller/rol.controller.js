const Rol = require('../models/rol.models'); // Asegúrate de que el path sea correcto

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    return roles;
  } catch (error) {
    console.error("❌ Error al obtener roles:", error);
    res.status(500).json({ mensaje: "Error al obtener roles", error });
  }
};

// Crear un nuevo rol
exports.crearRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevoRol = new Rol({
      nombre: nombre?.trim().toLowerCase(),
      descripcion: descripcion?.trim().toLowerCase()
    });

    await nuevoRol.save();
    res.status(201).json({ mensaje: "Rol creado correctamente", rol: nuevoRol });
  } catch (error) {
    console.error("❌ Error al crear rol:", error);
    res.status(400).json({ mensaje: "Error al crear rol", error });
  }
};

// Obtener un rol por ID
exports.obtenerRolPorId = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: "Rol no encontrado" });

    res.status(200).json(rol);
  } catch (error) {
    console.error("❌ Error al buscar rol:", error);
    res.status(500).json({ mensaje: "Error al buscar rol", error });
  }
};

// Actualizar un rol
exports.actualizarRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const rolActualizado = await Rol.findByIdAndUpdate(
      req.params.id,
      {
        nombre: nombre?.trim().toLowerCase(),
        descripcion: descripcion?.trim().toLowerCase()
      },
      { new: true, runValidators: true }
    );

    if (!rolActualizado) return res.status(404).json({ mensaje: "Rol no encontrado" });

    res.status(200).json({ mensaje: "Rol actualizado", rol: rolActualizado });
  } catch (error) {
    console.error("❌ Error al actualizar rol:", error);
    res.status(400).json({ mensaje: "Error al actualizar rol", error });
  }
};

// Eliminar un rol
exports.eliminarRol = async (req, res) => {
  try {
    const rolEliminado = await Rol.findByIdAndDelete(req.params.id);

    if (!rolEliminado) return res.status(404).json({ mensaje: "Rol no encontrado" });

    res.status(200).json({ mensaje: "Rol eliminado", rol: rolEliminado });
  } catch (error) {
    console.error("❌ Error al eliminar rol:", error);
    res.status(500).json({ mensaje: "Error al eliminar rol", error });
  }
};
