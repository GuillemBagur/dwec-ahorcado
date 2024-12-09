async function fetchDatosGuardados(idioma = "es") {
    const result = await fetch("/json/ahorcado.json");
    return (await result.json())[idioma];
}