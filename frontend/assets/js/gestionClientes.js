document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".formulario");
  const { mostrarToast } = require("./toast");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value.trim();
    const passwordVerify = document.getElementById("passwordVerify").value.trim();
    const condiciones = document.getElementById("condiciones").checked;

    // 🔹 Validaciones frontend
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
      return mostrarToast("Por favor ingresa un correo válido.", "danger");
    }

    if (!contrasena || contrasena.length < 6) {
      return mostrarToast("La contraseña debe tener al menos 6 caracteres.", "danger");
    }

    if (contrasena !== passwordVerify) {
      return mostrarToast("Las contraseñas no coinciden.", "danger");
    }

    if (!condiciones) {
      return mostrarToast("Debes aceptar los términos y condiciones.", "danger");
    }

    // 🔹 Enviar datos al servidor
    try {
      const response = await fetch("/v1/gestionClientesPublico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        mostrarToast("Registro exitoso 🎉", "success");
        form.reset();
        setTimeout(() => {
          window.location.href = "http://localhost:9090/v1";
        }, 1500);
      } else if (response.status === 409) {
        // 🔹 Caso especial: correo duplicado
        mostrarToast("⚠️ El correo ya está registrado. Intenta con otro.", "warning");
      } else {
        mostrarToast(data.message || "Error en el registro.", "danger");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      mostrarToast("Hubo un problema al registrar el cliente.", "danger");
    }
  });
});
