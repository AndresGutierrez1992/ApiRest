document.addEventListener("DOMContentLoaded", () => {
  const formAgregar = document.getElementById("formRegistrarRol");
  const formEditar = document.getElementById("formEditarRol");

  // AGREGAR ROL
  if (formAgregar) {
    formAgregar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();

      try {
        const res = await fetch("/v1/gestionRoles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, descripcion }),
        });

        if (res.ok) {
          alert("Rol registrado correctamente");
          bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
          formAgregar.reset();
          location.reload();
        } else {
          const error = await res.json();
          alert("Error: " + error.message);
        }
      } catch (err) {
        console.error("Error al registrar rol:", err);
      }
    });
  }

  // CARGAR DATOS EN EL MODAL DE EDICIÓN
  document.querySelectorAll(".btn-editar-rol").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const descripcion = btn.dataset.descripcion;

      document.getElementById("rolId").value = id;
      document.getElementById("editNombre").value = nombre;
      document.getElementById("editDescripcion").value = descripcion;
    });
  });

  // EDITAR ROL
  if (formEditar) {
    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = document.getElementById("rolId").value;
      const nombre = document.getElementById("editNombre").value.trim();
      const descripcion = document.getElementById("editDescripcion").value.trim();

      try {
        const res = await fetch(`/v1/gestionRoles/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, descripcion }),
        });

        if (res.ok) {
          alert("Rol actualizado correctamente");
          bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
          location.reload();
        } else {
          const error = await res.json();
          alert("Error: " + error.message);
        }
      } catch (err) {
        console.error("Error al editar rol:", err);
      }
    });
  }

  // ELIMINAR ROL
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const confirmar = confirm("¿Eliminar este rol?");
      if (!confirmar) return;

      try {
        const res = await fetch(`/v1/gestionRoles/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Rol eliminado");
          location.reload();
        } else {
          const err = await res.json();
          alert("Error al eliminar: " + err.message);
        }
      } catch (error) {
        console.error("Error al eliminar rol:", error);
      }
    });
  });
});
