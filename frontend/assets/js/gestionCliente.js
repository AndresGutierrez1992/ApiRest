document.addEventListener("DOMContentLoaded", () => {
  const formRegistrar = document.getElementById("formRegistrarCliente");
  const tablaUsuarios = document.getElementById("tablaUsuarios");

 
  const token = localStorage.getItem("token");

  // REGISTRAR CLIENTE
  if (formRegistrar) {
    formRegistrar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const correo = document.getElementById("email").value.trim();
      const contrasena = document.getElementById("password").value.trim();
      const verificar = document.getElementById("passwordVerify").value.trim();
      const aceptar = document.getElementById("condiciones").checked;

      if (!aceptar) return alert("Debes aceptar los términos y condiciones");
      if (contrasena !== verificar) return alert("Las contraseñas no coinciden");

      try {
        const res = await fetch("/v1/gestionClientes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ correo, contrasena})
        });

        if (res.ok) {
          alert("Cliente registrado correctamente");
          bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
          formRegistrar.reset();
          location.reload();
        } else {
          const error = await res.json();
          alert("Error: " + error.message);
        }
      } catch (err) {
        console.error("Error al registrar cliente:", err);
      }
    });
  }

  if (formRegistrarCliente) {
    formRegistrarCliente.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const correo = document.getElementById("email").value.trim();
      const contrasena = document.getElementById("password").value.trim();
      const rol = document.getElementById("rol").value || "cliente"; // default cliente si no selecciona
  
      try {
        const res = await fetch("/v1/gestionClientesPublico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasena, rol })
        });
  
        if (res.ok) {
          alert("Usuario registrado correctamente");
          formRegistrarCliente.reset();
        } else {
          const error = await res.json();
          alert("Error: " + error.message);
        }
      } catch (err) {
        console.error("Error al registrar cliente:", err);
      }
    });
  }
  

  // ELIMINAR CLIENTE
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const confirmar = confirm("¿Eliminar este cliente?");
      if (!confirmar) return;

      try {
        const res = await fetch(`/v1/gestionClientes/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          alert("Cliente eliminado");
          location.reload();
        } else {
          const err = await res.json();
          alert("Error al eliminar: " + err.message);
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    });
  });
});


// Capturar datos al hacer click en "Editar"
document.querySelectorAll(".btn-editar-cliente").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const correo = btn.dataset.correo;
    const contrasena = btn.dataset.contrasena;

    document.getElementById("clienteId").value = id;
    document.getElementById("editCorreo").value = correo;
    document.getElementById("editPassword").value = contrasena;
  });
});

// Enviar cambios del cliente
const formEditar = document.getElementById("formEditarCliente");
formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("clienteId").value;
  const correo = document.getElementById("editCorreo").value.trim();
  const contrasena = document.getElementById("editPassword").value.trim();

  try {
    const res = await fetch(`/v1/gestionClientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (res.ok) {
      alert("Cliente actualizado");
      bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
      location.reload();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  } catch (error) {
    console.error("Error al editar cliente:", error);
  }
});
