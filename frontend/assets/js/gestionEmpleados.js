document.addEventListener("DOMContentLoaded", () => {
  const formRegistrar = document.getElementById("formRegistrarEmpleado");
  const formEditar = document.getElementById("formEditarEmpleado");

  // Crear empleado
  if (formRegistrar) {
    formRegistrar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        cedula: document.getElementById("cedula").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        password: document.getElementById("password").value.trim()
      };
      console.log("Datos a enviar:", data);
      try {
        const res = await fetch("/v1/aggempleados", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          alert("Empleado registrado correctamente");
          bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
          location.reload();
        } else {
          const err = await res.json();
          alert("Error: " + err.message);
        }
      } catch (error) {
        console.error("Error al registrar:", error);
      }
    });
  }

  // Cargar datos en modal editar
  document.querySelectorAll(".btn-editar-empleado").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("editId").value = btn.dataset.id;
      document.getElementById("editNombre").value = btn.dataset.nombre;
      document.getElementById("editApellido").value = btn.dataset.apellido;
      document.getElementById("editCedula").value = btn.dataset.cedula;
      document.getElementById("editCorreo").value = btn.dataset.correo;
      document.getElementById("editTelefono").value = btn.dataset.telefono;
      document.getElementById("editDireccion").value = btn.dataset.direccion;
    });
  });

  // Guardar cambios en empleado
  if (formEditar) {
    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("editId").value;

      const data = {
        nombre: document.getElementById("editNombre").value.trim(),
        apellido: document.getElementById("editApellido").value.trim(),
        cedula: document.getElementById("editCedula").value.trim(),
        correo: document.getElementById("editCorreo").value.trim(),
        telefono: document.getElementById("editTelefono").value.trim(),
        direccion: document.getElementById("editDireccion").value.trim(),
        password: document.getElementById("editPassword").value.trim()
      };

      try {
        const res = await fetch(`/v1/aggempleados/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          alert("Empleado actualizado");
          bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
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

  // Eliminar empleado
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!confirm("¿Eliminar este empleado?")) return;

      try {
        const res = await fetch(`/v1/aggempleados/${id}`, {
          method: "DELETE"
        });

        if (res.ok) {
          alert("Empleado eliminado");
          location.reload();
        } else {
          const err = await res.json();
          alert("Error al eliminar: " + err.message);
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
      }
    });
  });
});
