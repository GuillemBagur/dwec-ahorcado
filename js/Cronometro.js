// Código propio extraído de los ejercicios de "tiempo"
// Convertido a una clase para poder encapsular todo este código. Así lo podemos reutilizar tanto en el cronómetro como en la cuenta atrás
class Cronometro {
    constructor(domElement, defaultTime, inc, finishCuentaAtrasCallback = () => {}) {
        this.cronometro = domElement;
        this.defaultTime = defaultTime;
        this.estaCronoActivo = false;
        this.inc = inc;
        this.finishCuentaAtrasCallback = finishCuentaAtrasCallback;
        
        this.cronoDate = new Date();
        this.initCrono();
    }

    static rellenarNumConCeros(numero, longitud) {
        let cadenaNumero = String(numero);

        while (cadenaNumero.length < longitud) {
            cadenaNumero = "0" + cadenaNumero;
        }

        return cadenaNumero;
    }

    initCrono() {
        this.cronoDate.setHours(...this.defaultTime);
        this.renderCrono(this.cronoDate);
        this.clearCrono();
        this.estaCronoActivo = false;
    }

    iniciarCrono() {
        if (!this.estaCronoActivo) {
            this.estaCronoActivo = true;
            this.cronoInterval = setInterval(() => this.execCrono(), 1000);
        }
    }

    checkDateLimit() {
        if (this.cronoDate.getHours() == 0 && this.cronoDate.getMinutes() == 0 && this.cronoDate.getSeconds() == 0) {
            this.finishCuentaAtrasCallback();
            this.initCrono();
            this.iniciarCrono();
        }
    }

    obtenerSegundosTotalesCrono() {
        return this.cronoDate.getHours() * 3600 + this.cronoDate.getMinutes() * 60 + this.cronoDate.getSeconds();
    }

    renderCrono() {
        this.cronometro.innerHTML = `${Cronometro.rellenarNumConCeros(this.cronoDate.getHours(), 2)}:${Cronometro.rellenarNumConCeros(this.cronoDate.getMinutes(), 2)}:${Cronometro.rellenarNumConCeros(this.cronoDate.getSeconds(), 2)}`;
    }

    updateTime() {
        this.cronoDate.setSeconds(this.cronoDate.getSeconds() + this.inc);
        this.checkDateLimit();
    }

    execCrono() {
        if (this.estaCronoActivo && isPlaying) {
            this.updateTime();
            this.renderCrono(this.cronoDate);
        }
    }

    clearCrono() {
        clearInterval(this.cronoInterval);
    }
}