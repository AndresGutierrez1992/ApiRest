  function mostrarToast(mensaje, tipo = "primary") {
        const toastEl = document.getElementById("toastRegistro");
        const toastBody = document.getElementById("toastMensaje");

        // Cambiar color según tipo (success, danger, warning, info, primary)
        toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;

        toastBody.textContent = mensaje;

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

export { mostrarToast };