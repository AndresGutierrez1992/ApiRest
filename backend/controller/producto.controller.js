const Producto = require('../models/productos.models');

// ✅ Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(400).json({ error: "No se pudo crear el producto" });
  }
};

// ✅ Obtener todos los productos

exports.obtenerProductos = async function () {
  try {
    const productos = await Producto.find();
    console.log(productos);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};


// ✅ Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// ✅ Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para devolver el nuevo documento actualizado
    );
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};

// ✅ Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
