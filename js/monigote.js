const imgs = ["8.png", "7.png", "6.png", "5.png", "4.png", "3.png", "2.png", "1.png"];

const domMonigote = document.getElementById("monigote");

function actualizarMonigote(vidas) {
    console.log(vidas, imgs[vidas]);
    domMonigote.src = `/imgs/ahorcado/${imgs[vidas]}`;
}