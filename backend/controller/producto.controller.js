const modeloproducto = require("../../backend/models/productos.models");



exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await modeloproducto.find();
    console.log("Productos:", productos);
    res.json(productos)
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error interno del servidor");
  }
};


exports.crearProducto = async (req, res) => {
  const nuevoProducto = new modeloproducto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  });

  try {
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
    res.render("pages/productos");
  } catch (err) {
    console.error("Error al guardar producto:", err);
    res.status(500).json({ error: "No se pudo guardar el producto" });
  }
};


exports.actualizarProducto = async (req, res) => {
  const id = req.params.id;
  const datosActualizados = {
    nombre: req.body.nombre,
    precio: req.body.precio
  };

  try {
    const productoActualizado = await modeloproducto.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
    res.render("pages/productos");
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};


exports.eliminarProducto = async (req, res) => {
  const idProducto = req.params.id;

  try {
    const productoEliminado = await modeloproducto.findByIdAndDelete(idProducto);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado });
    res.render("pages/productos");
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
