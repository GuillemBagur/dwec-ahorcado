let jugador;

const domMostrarNombreJugador = document.getElementById("mostrar-nombre-jugador");
const domJugadoresGuardados = document.getElementById("jugadores-guardados");
const domNombreNuevoJugador = document.getElementById("nombre-nuevo-jugador");
const domCrearNuevoJugador = document.getElementById("crear-nuevo-jugador");


// Devuelve un array con los nombres de los jugadores que tenemos en el LocalStorage
function cargarNombresJugadoresGuardados() {
    const datos = JSON.parse(localStorage.getItem("ahorcado-usuarios-guardados"));

    if (!datos) {
        return [];
    }

    return datos;
}

function guardarJugadores(jugadores) {
    localStorage.setItem("ahorcado-usuarios-guardados", JSON.stringify(jugadores));
}

function agregarJugador(nuevoJugador) {
    let jugadores = cargarNombresJugadoresGuardados();

    if (jugadores.includes(nuevoJugador)) {
        return;
    }

    jugadores.push(nuevoJugador);
    guardarJugadores(jugadores);
}

function dibujarNombreUsuario(nombreUsuario) {
    domMostrarNombreJugador.innerHTML = nombreUsuario;
}

function asignarUsuario(nombreUsuario) {
    jugador = nombreUsuario;
    dibujarNombreUsuario(jugador);
}

function dibujarNombresJugadoresGuardados() {
    function crearBtnEliminarJugador(idJugador) {
        const domEliminarJugador = document.createElement("button");
        domEliminarJugador.classList.add("btn-eliminar-jugador");
        domEliminarJugador.dataset["id-jugador"] = idJugador;
        domEliminarJugador.innerHTML = "x"

        return domEliminarJugador;
    }

    const jugadores = cargarNombresJugadoresGuardados();

    for (let i = 0; i < jugadores.length; i ++) {
        const jugador = jugadores[i];

        const domJugador = document.createElement("li");

        domJugador.innerHTML = jugador;
        domJugador.classList.add("jugador-guardado");
        domJugador.classList.add("efecto-hover");
        domJugador.appendChild(crearBtnEliminarJugador(i));

        domJugadoresGuardados.appendChild(domJugador);
    }
}

domCrearNuevoJugador.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombreJugador = domNombreNuevoJugador.value;
    nombreJugador = nombreJugador.toLowerCase();

    if (nombreJugador) {
        agregarJugador(nombreJugador);
        asignarUsuario(nombreJugador);
        domCrearNuevoJugador.classList.remove("mostrar");
        activarMain();
    }

});

domJugadoresGuardados.addEventListener("click", function (e) {
    if (e.target.classList.contains("jugador-guardado")) {
        asignarUsuario(e.target.innerHTML);

        domCrearNuevoJugador.classList.remove("mostrar");
        activarMain();
    }
});

dibujarNombresJugadoresGuardados();