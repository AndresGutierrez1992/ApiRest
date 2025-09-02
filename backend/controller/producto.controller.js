const Producto = require('../models/productos.models');
const log = require('../log');  // Importar logger

//  Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    log(` Producto creado: ${productoGuardado.nombre} (ID: ${productoGuardado._id})`);
    res.status(201).json(productoGuardado);
  } catch (error) {
    log(` Error al crear producto: ${error.message}`);
    console.error(" Error al crear producto:", error);
    res.status(400).json({ error: "No se pudo crear el producto" });
  }
};

//  Obtener todos los productos
exports.obtenerProductos = async function () {
  try {
    const productos = await Producto.find();
    log(`Se obtuvieron ${productos.length} productos`);
    console.log(productos);
    return productos;
  } catch (error) {
    log(` Error al obtener productos: ${error.message}`);
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

//  Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      log(` Producto no encontrado con ID: ${req.params.id}`);
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    log(`Producto consultado: ${producto.nombre} (ID: ${producto._id})`);
    res.json(producto);
  } catch (error) {
    log(` Error al obtener producto por ID: ${error.message}`);
    console.error(" Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

//  Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) {
      log(` Intento de actualizar producto inexistente (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    log(`✏️ Producto actualizado: ${productoActualizado.nombre} (ID: ${productoActualizado._id})`);
    res.json(productoActualizado);
  } catch (error) {
    log(`Error al actualizar producto: ${error.message}`);
    console.error(" Error al actualizar producto:", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      log(` Intento de eliminar producto inexistente (ID: ${req.params.id})`);
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    log(` Producto eliminado: ${productoEliminado.nombre} (ID: ${productoEliminado._id})`);
    res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado });
  } catch (error) {
    log(` Error al eliminar producto: ${error.message}`);
    console.error(" Error al eliminar producto:", error);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
