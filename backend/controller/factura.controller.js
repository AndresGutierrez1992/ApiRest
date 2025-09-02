const Factura = require("../models/factura.models");

// ✅ Crear una nueva factura
exports.crearFactura = async (req, res) => {
  try {
    const { cliente, productos } = req.body;

    // calcular total
    const total = productos.reduce((acc, item) => acc + item.subtotal, 0);

    const nuevaFactura = new Factura({
      cliente,
      productos,
      total,
    });

    await nuevaFactura.save();

    res.status(201).json({ mensaje: "Factura creada correctamente", factura: nuevaFactura });
  } catch (error) {
    console.error("❌ Error al crear factura:", error);
    res.status(400).json({ mensaje: "Error al crear factura", error: error.message });
  }
};

// ✅ Obtener todas las facturas
exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find()
      .populate("cliente", "correo")
      .populate("productos.producto", "nombre precio");

    res.json(facturas);
  } catch (error) {
    console.error("❌ Error al obtener facturas:", error);
    res.status(500).json({ mensaje: "Error al obtener facturas", error: error.message });
  }
};

// ✅ Obtener una factura por ID
exports.obtenerFacturaPorId = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id)
      .populate("cliente", "correo")
      .populate("productos.producto", "nombre precio");

    if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });

    res.json(factura);
  } catch (error) {
    console.error("❌ Error al obtener factura:", error);
    res.status(500).json({ mensaje: "Error al obtener factura", error: error.message });
  }
};

// ✅ Actualizar factura
exports.actualizarFactura = async (req, res) => {
  try {
    const facturaActualizada = await Factura.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("cliente", "correo")
      .populate("productos.producto", "nombre precio");

    if (!facturaActualizada) return res.status(404).json({ mensaje: "Factura no encontrada" });

    res.json(facturaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar factura:", error);
    res.status(500).json({ mensaje: "Error al actualizar factura", error: error.message });
  }
};

// ✅ Eliminar factura
exports.eliminarFactura = async (req, res) => {
  try {
    const facturaEliminada = await Factura.findByIdAndDelete(req.params.id);

    if (!facturaEliminada) return res.status(404).json({ mensaje: "Factura no encontrada" });

    res.json({ mensaje: "Factura eliminada", factura: facturaEliminada });
  } catch (error) {
    console.error("❌ Error al eliminar factura:", error);
    res.status(500).json({ mensaje: "Error al eliminar factura", error: error.message });
  }
};
