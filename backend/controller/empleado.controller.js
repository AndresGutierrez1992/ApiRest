const Empleado = require('../models/empleado.models');
const log = require('../log'); //  Importar el logger

// Crear empleado
exports.crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();

    log(`Empleado creado: ${empleadoGuardado.nombre} (ID: ${empleadoGuardado._id})`);

    res.status(201).json(empleadoGuardado);
  } catch (error) {
    console.error("Error al crear empleado:", error);
    log(`Error al crear empleado: ${error.message}`);
    res.status(400).json({ error: "No se pudo crear el empleado" });
  }
};

// Obtener todos los empleados
exports.obtenerEmpleados = async () => {
  try {
    const empleados = await Empleado.find();
    log(`Se consultaron todos los empleados (total: ${empleados.length})`);
    return empleados;
  } catch (error) {
    console.error(" Error al obtener empleados:", error);
    log(` Error al obtener empleados: ${error.message}`);
    throw error;
  }
};

//  Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      log(` Empleado no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    log(` Empleado consultado: ${empleado.nombre} (ID: ${empleado._id})`);
    res.json(empleado);
  } catch (error) {
    console.error(" Error al obtener empleado:", error);
    log(` Error al obtener empleado: ${error.message}`);
    res.status(500).json({ error: "Error al obtener el empleado" });
  }
};

//  Actualizar empleado
exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!empleadoActualizado) {
      log(` No se pudo actualizar: empleado no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    log(` Empleado actualizado: ${empleadoActualizado.nombre} (ID: ${empleadoActualizado._id})`);
    res.json(empleadoActualizado);
  } catch (error) {
    console.error(" Error al actualizar empleado:", error);
    log(` Error al actualizar empleado: ${error.message}`);
    res.status(500).json({ error: "No se pudo actualizar el empleado" });
  }
};

// Eliminar empleado
exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      log(` No se pudo eliminar: empleado no encontrado (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    log(` Empleado eliminado: ${empleadoEliminado.nombre} (ID: ${empleadoEliminado._id})`);
    res.json({ mensaje: "Empleado eliminado correctamente", empleado: empleadoEliminado });
  } catch (error) {
    console.error(" Error al eliminar empleado:", error);
    log(` Error al eliminar empleado: ${error.message}`);
    res.status(500).json({ error: "No se pudo eliminar el empleado" });
  }
};
