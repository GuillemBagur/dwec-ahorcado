// Código propio extraído de los ejercicios de "tiempo"
const cronometro = document.getElementById("cronometro");


cronoDate.setHours(0, 0, 10, 0);

function rellenarNumConCeros(numero, longitud) {
    let cadenaNumero = String(numero);

    while (cadenaNumero.length < longitud) {
        cadenaNumero = "0" + cadenaNumero;
    }

    return cadenaNumero;
}

function iniciarCrono() {
    if(!estaCronoActivo) {
        estaCronoActivo = true;
        cronoInterval = setInterval(execCrono, 1000);
    }
}

function checkDateLimit() {
    if (cronoDate.getHours() == 0 && cronoDate.getMinutes() == 0 && cronoDate.getSeconds() == 0) {
        alert("has perdido");
    }
}

function initCrono() {
    cronoDate.setHours(0, 0, 10, 0);
    renderCrono(cronoDate);
    estaCronoActivo = false;
}

function renderCrono() {
    cronometro.innerHTML =
        `${rellenarNumConCeros(cronoDate.getHours(), 2)}:${rellenarNumConCeros(cronoDate.getMinutes(), 2)}:${rellenarNumConCeros(cronoDate.getSeconds(), 2)}`;
}

function updateTime() {
    cronoDate.setSeconds(cronoDate.getSeconds() - 1);
    checkDateLimit();
}

function execCrono() {
    if(estaCronoActivo && isPlaying) {
        updateTime();
        renderCrono(cronoDate);
    }
}


function clearCrono() {
    clearInterval(cronoInterval);
}
