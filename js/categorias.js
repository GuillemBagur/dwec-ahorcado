const domErrorCategorias = document.getElementById("error-categorias");
const domContenedorCategorias = document.getElementById("contenedor-categorias");

function obtenerError() {
    const error = sessionStorage.getItem("error");
    sessionStorage.removeItem("error");
    return error;
}

function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
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

async function dibujarCategorias() {
    const datosJSON = await fetchDatosJSON();
    const categorias = getCategorias(datosJSON);

    domContenedorCategorias.innerHTML = "";
    for(let categoria of categorias) {
        domContenedorCategorias.innerHTML += `<label class="categoria"><input class="categoria-input" type="checkbox" name="categoria" value="${categoria}">${capitalize(categoria)}</label>`;
    }
}

dibujarCategorias();
mostrarErrores();