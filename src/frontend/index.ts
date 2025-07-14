const main = document.querySelector("main") as HTMLElement;

const lengthForm = document.getElementById("length-form") as HTMLFormElement;
const weightForm = document.getElementById("weight-form") as HTMLFormElement;
const temperatureForm = document.getElementById(
  "temperature-form"
) as HTMLFormElement;

const regex = /^-?\d+(\.\d+)?$/;

// Interfaces
interface Endpoint {
  url: string;
}
interface ConvertData {
  measure: number;
  inputUnit: string;
  outputUnit: string;
}

// Array de tipo Endpoint para guardar las URLs de las APIs
const endpoints: Record<string, string> = {
  length: "http://localhost:9090/api/length",
  weight: "http://localhost:9090/api/weight",
  temperature: "http://localhost:9090/api/temperature",
};

// Evento al hacer submit en el formulario de longitud
lengthForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const measureInString = lengthForm.lengthMeasure.value;
  if (!measureInString.trim() || !regex.test(measureInString)) {
    alert("La longitud ingresada no es válida");
    lengthForm.lengthMeasure.value = "";
    return;
  }

  const formData: ConvertData = {
    measure: parseFloat(measureInString),
    inputUnit: lengthForm.inputUnit.value,
    outputUnit: lengthForm.outputUnit.value,
  };

  if (formData.inputUnit === formData.outputUnit)
    return alert("La unidades de longitud no pueden ser iguales");

  try {
    const response: Response = await fetch(endpoints["length"], {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok)
      throw new Error(`Error en la solicitud: ${response.status}`);

    const data = await response.json();

    lengthForm.remove();
    main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/length" class="reset-link">Resetear</a><p>
      `;
  } catch (err) {
    console.error("error:", (err as Error).message);
  }
});

// Evento al hacer submit en el formulario de peso
weightForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const measureInString = weightForm.weightMeasure.value;
  if (!measureInString.trim() || !regex.test(measureInString)) {
    alert("El peso ingresado no es válido");
    weightForm.weightMeasure.value = "";
    return;
  }

  const formData: ConvertData = {
    measure: parseFloat(measureInString),
    inputUnit: weightForm.inputUnit.value,
    outputUnit: weightForm.outputUnit.value,
  };

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

    weightForm.remove();
    main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/weight" class="reset-link">Resetear</a><p>
      `;
  } catch (err) {
    console.error("error:", (err as Error).message);
  }
});

// Evento al hacer submit en el formulario de temperatura
temperatureForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const measureInString = temperatureForm.temperatureMeasure.value;
  if (!measureInString.trim() || !regex.test(measureInString)) {
    alert("La temperatura ingresada no es válida");
    temperatureForm.temperatureMeasure.value = "";
    return;
  }

  const formData: ConvertData = {
    measure: parseFloat(measureInString),
    inputUnit: temperatureForm.inputUnit.value,
    outputUnit: temperatureForm.outputUnit.value,
  };

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

    temperatureForm.remove();
    main.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="/temperature" class="reset-link">Resetear</a><p>
      `;
  } catch (err) {
    console.error("error:", (err as Error).message);
  }
});
