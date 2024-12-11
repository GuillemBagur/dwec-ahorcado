// Ideas

// que el cronómetro cambie de color cuando quede poco tiempo
// que el contador de vidas cambie de color
// meter el muñeco
// mejorar display vidas
// mejorar popup ganado
// Animación especial cuando se adivine una letra

const domAbecedario = document.getElementById("abecedario");
const domDisplayPalabra = document.getElementById("display-palabra");
const domContadorVidas = document.getElementById("contador-vidas");
const domMsgFinJuegoContainer = document.getElementById("msg-fin-juego-container");
const domMsgFinJuego = document.getElementById("msg-fin-juego");
const domReiniciarJuego = document.getElementById("reiniciar-juego");
const domMain = document.getElementById("main");

const VIDAS_INICIO = 7;

let palabraAdivinar;
let vidas = VIDAS_INICIO;
let letrasAdivinadas = 0;
let isPlaying = true;

function calcularIntentos() {
    const letrasPulsadas = domAbecedario.querySelectorAll(".correcta, .incorrecta");
    return letrasPulsadas.length;
}

function generarGuionesPalabra(palabra) {
    if(!/[A-Z\s]+/.test(palabra)) {
        console.log("Palabra incorrecta.");
        return;
    }

    for (let i = 0; i < palabra.length; i++) {
        // Si la letra es un espacio, debe representarse en el juego
        if(palabra[i] === " ") {
            let domEspacio = document.createElement("div");
            domEspacio.classList.add("guion-espacio");
            domDisplayPalabra.appendChild(domEspacio);

        } else {
            let domGuionLetra = document.createElement("div");
            domGuionLetra.classList.add("guion-letra");
            // Mejor usar dataset que clases.
            domGuionLetra.dataset.letra = palabra[i];
            
            domDisplayPalabra.appendChild(domGuionLetra);
        }
    }
}

function initJuego() {
    initPalabra();
    pintarVidas();
    pintaAbecedario();
    cronometroController.initCrono();
    desactivarMain();
}

function validarCategorias(categorias) {
    if(!categorias | categorias?.length === 0) {
        sessionStorage.setItem("error", "no-categories");
        window.location.href = "/categorias.html";
    }
}

function obtenerCategoriasDesdeUrl() {
    let params = new URLSearchParams(document.location.search);
    let categorias = params.getAll("categoria");

    return categorias;
}

function combinarCategorias(categorias, palabras, dificultad) {
    let categoriasCombinadas = [];
    
    for(let categoria of categorias) {
        if(palabras[categoria]) {
            categoriasCombinadas = [...categoriasCombinadas, ...palabras[categoria][dificultad]];
        }
    }
    
    return categoriasCombinadas;
}

async function initPalabra() {
    let categorias = obtenerCategoriasDesdeUrl();
    validarCategorias(categorias);

    const datosGuardados = await fetchDatosGuardados("es");
    const PALABRAS = datosGuardados.palabras;
    const categoriasCombinadas = combinarCategorias(categorias, PALABRAS, "medio");
    
    palabraAdivinar = categoriasCombinadas[Math.floor(Math.random() * categoriasCombinadas.length)].toUpperCase();
    palabraAdivinar = eliminarTildes(palabraAdivinar);
    generarGuionesPalabra(palabraAdivinar);
}

function esLetraEne(i) {
    return i === 78;
}

function crearLetra(caracter) {
    let domLetra = document.createElement("div");
    domLetra.classList.add("letra");
    domLetra.innerText = caracter;
    domAbecedario.appendChild(domLetra);
}

function pintaAbecedario() {
    for (let i = 65; i < 90; i++) {
        crearLetra(String.fromCharCode(i));

        if (esLetraEne(i)) {
            crearLetra("Ñ");
        }
    }
}

function eliminarTildes(string) {
    // Hay una función para normalizar strings, pero nosotros queremos conservar la Ñ, así que creamos una función manualmente.
    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    string = string.toUpperCase();
    string = string.replace(/[Á]/g, "A");
    string = string.replace(/[É]/g, "E");
    string = string.replace(/[Í]/g, "I");
    string = string.replace(/[Ó]/g, "O");
    string = string.replace(/[Ú]/g, "U");
    return string;
}

// Los espacios no se eliminan, así que los suprimimos para comprobar si el jugador ha ganado la partida.
function contarCaracteresAAdivinar(palabra) {
    return palabra.replace(/\s/g, "").length;
}

function checkWin() {
    return letrasAdivinadas === contarCaracteresAAdivinar(palabraAdivinar);
}

function pintarVidas() {
    domContadorVidas.innerHTML = `${vidas} ${vidas > 1 ? "vidas" : "vida"}`;
}

function restarVidas() {
    vidas--;
    pintarVidas();
    actualizarMonigote(vidas);

    if (vidas === 0) {
        mostrarFinJuego(false);
    }
}

function checkPalabraContieneLetra(palabraAdivinar, letra) {
    const domGuionesLetra = document.querySelectorAll(".guion-letra");

    domGuionesLetra.forEach(function (domGuionLetra) {
        if (domGuionLetra.dataset.letra === letra) {
            domGuionLetra.innerText = domGuionLetra.dataset.letra;
            letrasAdivinadas++;
        }
    });

    return eliminarTildes(palabraAdivinar).includes(letra);
}

function desactivarMain() {
    domMain.classList.add("desactivado");
}

function activarMain() {
    domMain.classList.remove("desactivado");
}

function mostrarFinJuego(isWin) {
    isPlaying = false;

    domMsgFinJuegoContainer.classList.add("mostrar");
    desactivarMain();

    if (isWin) {
        domMsgFinJuego.innerHTML = "¡Has ganado!";
        const registro = new Record(jugador, palabraAdivinar, vidas, calcularIntentos(), cronometroController.obtenerSegundosTotalesCrono());
        registro.guardar();

    } else {
        domMsgFinJuego.innerHTML = "Has perdido...";
    }
}

function esPulsable(letra) {
    return !letra.classList.contains("correcta") && !letra.classList.contains("incorrecta");
}

function reiniciarJuego() {
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    domAbecedario.addEventListener("click", function (e) {
        if (!isPlaying) {
            return;
        }

        if (e.target.classList.contains("letra") && esPulsable(e.target)) {
            const domLetra = e.target;
            cronometroController.iniciarCrono();
            cuentaAtrasController.initCrono();
            cuentaAtrasController.iniciarCrono();

            if (checkPalabraContieneLetra(palabraAdivinar, domLetra.innerText)) {
                domLetra.classList.add("correcta");
                if (checkWin()) {
                    mostrarFinJuego(true);
                }

            } else {
                domLetra.classList.add("incorrecta");
                restarVidas();
            }
        }
    });

    domReiniciarJuego.addEventListener("click", function () {
        reiniciarJuego();
    })


    initJuego();
});
