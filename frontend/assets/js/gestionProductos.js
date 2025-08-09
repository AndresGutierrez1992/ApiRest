document.addEventListener("DOMContentLoaded", () => {
  const formAgregar = document.getElementById("formProducto");
  const formEditar = document.getElementById("formEditarProducto");

  // AGREGAR PRODUCTO
  if (formAgregar) {
    formAgregar.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        categoria: document.getElementById("categoria").value
      };

      try {
        const res = await fetch("/v1/aggproductos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          const modalAdd = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
          if (modalAdd) modalAdd.hide();
          alert("Producto agregado correctamente");
          location.reload();
        } else {
          const err = await res.json();
          alert("Error: " + err.message);
        }
      } catch (error) {
        console.error("Error al agregar:", error);
      }
    });
  }

  // EDITAR PRODUCTO - Cargar datos
 document.querySelectorAll(".btn-warning").forEach((btn) => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    const celdas = row.querySelectorAll("td");

    document.getElementById("edit-nombre").value = celdas[1].innerText;
    document.getElementById("edit-descripcion").value = celdas[2].innerText;
    document.getElementById("edit-url").value = celdas[3].querySelector("img").src;
    document.getElementById("edit-precio").value = parseFloat(celdas[4].innerText.replace("$", "").trim());
    document.getElementById("edit-stock").value = celdas[5].innerText;
    document.getElementById("edit-categoria").value = celdas[6].innerText;

    // ✅ Guardamos el ID directo desde el botón
    const idProducto = this.dataset.id;
    document.getElementById("formEditarProducto").dataset.id = idProducto;
  });
});


  // GUARDAR CAMBIOS
  if (formEditar) {
    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = formEditar.dataset.id;
      console.log("ID del producto a editar:", id);
      if (!id) {
        alert("No se ha seleccionado producto.");
        return;
      }

      const data = {
        nombre: document.getElementById("edit-nombre").value,
        descripcion: document.getElementById("edit-descripcion").value,
        imagen: document.getElementById("edit-url").value,
        precio: parseFloat(document.getElementById("edit-precio").value),
        stock: parseInt(document.getElementById("edit-stock").value),
        categoria: document.getElementById("edit-categoria").value
      };

      try {
        const res = await fetch(`/v1/aggproductos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          const modalEdit = bootstrap.Modal.getInstance(document.getElementById("editProductModal"));
          if (modalEdit) modalEdit.hide();
          alert("Producto actualizado");
          location.reload();
        } else {
          const err = await res.json();
          alert("Error: " + err.message);
        }
      } catch (error) {
        console.error("Error al editar:", error);
      }
    });
  }


  document.querySelectorAll(".btn-eliminar-producto").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    const confirmar = confirm("¿Eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`/v1/aggproductos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Producto eliminado");
        location.reload();
      } else {
        const err = await res.json();
        alert("Error al eliminar: " + err.message);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  });
});



});
