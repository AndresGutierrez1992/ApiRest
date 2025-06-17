const modeloproducto = require("../models/productos.models");

exports.consultar=(req, res)=>{
  modeloproducto
    .find()
    .then((producto) => {
      console.log("producto encontrados:", producto);
    })
    .catch((err) => {
      console.error("Error al buscar productos:", err);
    });
}



exports.crearProducto = async (req, res) => {
  const nuevoProducto = new modeloproducto({
    nombre: req.body.nombre,
    precio: req.body.precio
  });

  try {
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
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
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};

