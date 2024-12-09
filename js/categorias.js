const domErrorCategorias = document.getElementById("error-categorias");
const domContenedorCategorias = document.getElementById("contenedor-categorias");

function obtenerError() {
    const error = sessionStorage.getItem("error");
    sessionStorage.removeItem("error");
    return error;
}

function mostrarErrores() {
    const error = obtenerError();

    if(error === "no-categories") {
        domErrorCategorias.classList.add("visible");
        domErrorCategorias.innerHTML = "Debes especificar, como mínimo, una categoría.";
    }
}

function getCategorias(datosGuardados) {
    return Object.keys(datosGuardados.palabras);
}

/* async function dibujarCategorias() {
    const datosGuardados = await fetchDatosGuardados();
}
 */
mostrarErrores();