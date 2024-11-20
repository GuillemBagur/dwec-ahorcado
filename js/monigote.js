const imgs = { 6: "1.png", 5: "2.png", 4: "3.png", 3: "4.png", 2: "5.png", 1: "6.png", 0: "7.png" };

const domMonigote = document.getElementById("monigote");

function actualizarMonigote(vidas) {
    console.log(vidas);
    domMonigote.src = `/imgs/ahorcado/${imgs[vidas]}`;
}