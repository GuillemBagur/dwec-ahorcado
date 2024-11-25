class Record {
    static NOMBRE_LS = "datos-ahorcado";

    constructor(jugador, palabra, vidasRestantes, intentos, tiempoFinal) {
        this.jugador = jugador;
        this.palabra = palabra;
        this.vidasRestantes = vidasRestantes;
        this.intentos = intentos;
        this.tiempoFinal = tiempoFinal;
        this.fecha = new Date();

        this.obtenerDatos = function () {
            const datos = JSON.parse(localStorage.getItem(Record.crearNombreLS(this.jugador)));

            if (!datos) {
                return {};
            }

            return datos;
        };

        this.compareRecords = function (recordAntiguo, recordNuevo) {
            if (recordNuevo.vidasRestantes > recordAntiguo.vidasRestantes) {
                return recordNuevo;
            }

            if (recordNuevo.tiempoFinal > recordAntiguo.tiempoFinal) {
                return recordNuevo;
            }

            return recordAntiguo;
        };

        this.guardar = function () {
            let datos = this.obtenerDatos();

            // Si la palabra existía, comparamos los dos récords y nos quedamos con el más bueno
            if (datos[this.palabra]) {
                datos[this.palabra] = this.compareRecords(datos[this.palabra], this);

            } else {
                datos[this.palabra] = this;
            }

            localStorage.setItem(Record.crearNombreLS(this.jugador), JSON.stringify(datos));
        };
    }

    static crearNombreLS(nombreJugador) {
        return `${nombreJugador}-${Record.NOMBRE_LS}`;
    }
}