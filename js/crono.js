const domCronometro = document.getElementById("cronometro");
let cronometroController = new Cronometro(domCronometro, [0, 0, 0, 0], 1);

const domCuentaAtras = document.getElementById("cuenta-atras");
const cuentaAtrasController = new Cronometro(domCuentaAtras, [0, 0, 10, 0], -1, () => restarVidas());