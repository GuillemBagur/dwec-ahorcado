let usuario;

const domMostrarNombreJugador = document.getElementById("mostrar-nombre-jugador");
const domJugadoresGuardados = document.getElementById("jugadores-guardados");
const domNombreNuevoJugador = document.getElementById("nombre-nuevo-jugador");
const domCrearNuevoJugador = document.getElementById("crear-nuevo-jugador");


// Devuelve un array con los nombres de los jugadores que tenemos en el LocalStorage
function cargarNombresJugadoresGuardados() {
    const datos = JSON.parse(localStorage.getItem("ahorcado-usuarios-guardados"));

    if (!datos) {
        return ["guiem", "bart skils!"];
    }

    return datos;
}

function dibujarNombreUsuario(nombreUsuario) {
    domMostrarNombreJugador.innerHTML = nombreUsuario;
}

function asignarUsuario(nombreUsuario) {
    usuario = nombreUsuario;
    dibujarNombreUsuario(usuario);
}

function dibujarNombresJugadoresGuardados() {
    const jugadores = cargarNombresJugadoresGuardados();

    for (let jugador of jugadores) {
        const domJugador = document.createElement("li");
        domJugador.innerHTML = jugador;
        domJugador.classList.add("jugador-guardado");
        domJugadoresGuardados.appendChild(domJugador);
    }
}

domCrearNuevoJugador.addEventListener("submit", function (e) {
    e.preventDefault();

    if (domNombreNuevoJugador.value) {
        asignarUsuario(domNombreNuevoJugador.value);
    }

    domCrearNuevoJugador.classList.remove("mostrar");
    activarMain();
});

domJugadoresGuardados.addEventListener("click", function (e) {
    if (e.target.classList.contains("jugador-guardado")) {
        asignarUsuario(e.target.innerHTML);

        domCrearNuevoJugador.classList.remove("mostrar");
        activarMain();
    }
});

dibujarNombresJugadoresGuardados();