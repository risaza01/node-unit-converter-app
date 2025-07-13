"use strict";
const lengthMain = document.getElementById("length-main");
const lengthForm = document.getElementById("length-form");
// Array de tipo Endpoint para guardar las URLs de las APIs
const endpoints = [
    { url: `http://localhost:9090/api/length` },
    { url: `http://localhost:9090/api/weigth` },
    { url: `http://localhost:9090/api/temperature` },
];
// Evento al hacer submit en el formulario de longitud
lengthForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataForm = {
        measure: parseFloat(lengthForm.lengthMeasure.value),
        inputUnit: lengthForm.inputUnit.value,
        outputUnit: lengthForm.outputUnit.value,
    };
    if (!dataForm.measure)
        return alert("La longitud ingresada no es válida");
    if (dataForm.inputUnit === dataForm.outputUnit)
        return alert("La unidades de longitud no pueden ser iguales");
    try {
        const response = await fetch(endpoints[0].url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataForm),
        });
        if (!response.ok)
            throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        lengthForm.remove();
        lengthMain.innerHTML = `<p class="result">${dataForm.measure} ${dataForm.inputUnit} = ${data.result} ${dataForm.outputUnit}</p>
      <p><a href="http://localhost:9090/length" class="reset-link">Resetear</a><p>
      `;
    }
    catch (err) {
        console.error("error:", err.message);
    }
});
