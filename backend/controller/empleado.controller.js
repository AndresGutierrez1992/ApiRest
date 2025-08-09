const Empleado = require('../models/empleado.models');

// ✅ Crear empleado
exports.crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (error) {
    console.error("❌ Error al crear empleado:", error);
    res.status(400).json({ error: "No se pudo crear el empleado" });
  }
};

// ✅ Obtener todos los empleados
exports.obtenerEmpleados = async () => {
  try {
    const empleados = await Empleado.find();
    return empleados;
  } catch (error) {
    console.error("❌ Error al obtener empleados:", error);
    throw error;
  }
};


// ✅ Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json(empleado);
  } catch (error) {
    console.error("❌ Error al obtener empleado:", error);
    res.status(500).json({ error: "Error al obtener el empleado" });
  }
};

// ✅ Actualizar empleado
exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!empleadoActualizado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json(empleadoActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar empleado:", error);
    res.status(500).json({ error: "No se pudo actualizar el empleado" });
  }
};

// ✅ Eliminar empleado
exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado eliminado correctamente", empleado: empleadoEliminado });
  } catch (error) {
    console.error("❌ Error al eliminar empleado:", error);
    res.status(500).json({ error: "No se pudo eliminar el empleado" });
  }
};
