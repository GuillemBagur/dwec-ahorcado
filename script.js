// Ideas

// que el cronómetro cambie de color cuando quede poco tiempo
// que el contador de vidas cambie de color
// meter el muñeco
// mejorar display vidas
// mejorar popup ganado
// Animación especial cuando se adivine una letra

document.addEventListener("DOMContentLoaded", function () {
    const domAbecedario = this.getElementById("abecedario");
    const domDisplayPalabra = this.getElementById("display-palabra");
    const domContadorVidas = this.getElementById("contador-vidas");
    const domMsgFinJuego = this.getElementById("msg-fin-juego");

    function generarGuionesPalabra(palabra) {
        for (let i = 0; i < palabra.length; i++) {
            let domGuionLetra = document.createElement("div");
            domGuionLetra.classList.add("guion-letra");
            // Mejor usar dataset que clases.
            domGuionLetra.dataset.letra = palabra[i];

            domDisplayPalabra.appendChild(domGuionLetra);
        }
    }

    function initJuego() {
        initPalabra();
        pintarVidas();
        pintaAbecedario();
        initCrono();
    }

    function initPalabra() {
        const PALABRAS = ["A", "AÑA", "TECNOLOGÍA", "INFORMÁTICA", "JAVA", "ORDENADOR", "MONTAÑA"];

        palabraAdivinar = PALABRAS[Math.floor(Math.random() * PALABRAS.length)].toUpperCase();

        palabraAdivinar = PALABRAS[1].toUpperCase();

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

    function checkWin() {
        return letrasAdivinadas === palabraAdivinar.length;
    }

    function pintarVidas() {
        domContadorVidas.innerHTML = vidas;
    }

    function restarVidas() {
        vidas--;
        pintarVidas();

        if (vidas === 0) {
            mostrarFinJuego(false);
        }
    }

    function checkPalabraContieneLetra(palabraAdivinar, letra) {
        const domGuionesLetra = document.querySelectorAll(".guion-letra");

        domGuionesLetra.forEach(function (domGuionLetra) {
            if (eliminarTildes(domGuionLetra.dataset.letra) === letra) {
                domGuionLetra.innerText = domGuionLetra.dataset.letra;
                letrasAdivinadas++;
            }
        });

        return eliminarTildes(palabraAdivinar).includes(letra);
    }

    function mostrarFinJuego(isWin) {
        isPlaying = false;

        if (isWin) {
            domMsgFinJuego.innerHTML = "¡Has ganado!";
        } else {
            domMsgFinJuego.innerHTML = "Has perdido...";
        }
    }

    domAbecedario.addEventListener("click", function (e) {
        if (!isPlaying) {
            return;
        }

        if (e.target.classList.contains("letra")) {
            const domLetra = e.target;
            iniciarCrono();

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



    initJuego();
    console.log(palabraAdivinar);

});
