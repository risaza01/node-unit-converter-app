"use strict";
const main = document.querySelector("main");
const lengthForm = document.getElementById("length-form");
const weightForm = document.getElementById("weight-form");
const temperatureForm = document.getElementById("temperature-form");
// Regex para validar que las medidas ingresadas solo sean número enteros o decimales
const regex = /^-?\d+(\.\d+)?$/;
// Objeto de tipo Endpoint para guardar las URLs de las APIs
const endpoints = {
    length: "http://localhost:9090/api/length",
    weight: "http://localhost:9090/api/weight",
    temperature: "http://localhost:9090/api/temperature",
};
// Evento al hacer submit en el formulario de longitud
lengthForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Validar la medida ingresada con el regex creado
    const measureInString = lengthForm.lengthMeasure.value;
    if (!measureInString.trim() || !regex.test(measureInString)) {
        alert("La longitud ingresada no es válida");
        lengthForm.lengthMeasure.value = "";
        return;
    }
    // Objeto con la info del formulario
    const formData = {
        measure: parseFloat(measureInString),
        inputUnit: lengthForm.inputUnit.value,
        outputUnit: lengthForm.outputUnit.value,
    };
    // Validar que las unidades de medida no sean iguales
    if (formData.inputUnit === formData.outputUnit)
        return alert("La unidades de longitud no pueden ser iguales");
    try {
        const response = await fetch(endpoints["length"], {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (!response.ok)
            throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        // Eliminar el formulario y agregar el resultado dentro de la etiqueta main
        lengthForm.remove();
        main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/length" class="reset-link">Resetear</a><p>
      `;
    }
    catch (err) {
        console.error("error:", err.message);
    }
});
// Evento al hacer submit en el formulario de peso
weightForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Validar la medida ingresada con el regex creado
    const measureInString = weightForm.weightMeasure.value;
    if (!measureInString.trim() || !regex.test(measureInString)) {
        alert("El peso ingresado no es válido");
        weightForm.weightMeasure.value = "";
        return;
    }
    // Objeto con la info del formulario
    const formData = {
        measure: parseFloat(measureInString),
        inputUnit: weightForm.inputUnit.value,
        outputUnit: weightForm.outputUnit.value,
    };
    // Validar que las unidades de medida no sean iguales
    if (formData.inputUnit === formData.outputUnit)
        return alert("La unidades de peso no pueden ser iguales");
    try {
        const response = await fetch(endpoints["weight"], {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok)
            throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        // Eliminar el formulario y agregar el resultado dentro de la etiqueta main
        weightForm.remove();
        main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/weight" class="reset-link">Resetear</a><p>
      `;
    }
    catch (err) {
        console.error("error:", err.message);
    }
});
// Evento al hacer submit en el formulario de temperatura
temperatureForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Validar la medida ingresada con el regex creado
    const measureInString = temperatureForm.temperatureMeasure.value;
    if (!measureInString.trim() || !regex.test(measureInString)) {
        alert("La temperatura ingresada no es válida");
        temperatureForm.temperatureMeasure.value = "";
        return;
    }
    // Objeto con la info del formulario
    const formData = {
        measure: parseFloat(measureInString),
        inputUnit: temperatureForm.inputUnit.value,
        outputUnit: temperatureForm.outputUnit.value,
    };
    // Validar que las unidades de medida no sean iguales
    if (formData.inputUnit === formData.outputUnit)
        return alert("La unidades de temperatura no pueden ser iguales");
    try {
        const response = await fetch(endpoints["temperature"], {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (!response.ok)
            throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        // Eliminar el formulario y agregar el resultado dentro de la etiqueta main
        temperatureForm.remove();
        main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/temperature" class="reset-link">Resetear</a><p>
      `;
    }
    catch (err) {
        console.error("error:", err.message);
    }
});
