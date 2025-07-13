const lengthMain = document.getElementById("length-main") as HTMLElement;
const weightMain = document.getElementById("weight-main") as HTMLElement;

const lengthForm = document.getElementById("length-form") as HTMLFormElement;
const weightForm = document.getElementById("weight-form") as HTMLFormElement;

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

  const formData: ConvertData = {
    measure: parseFloat(lengthForm.lengthMeasure.value),
    inputUnit: lengthForm.inputUnit.value,
    outputUnit: lengthForm.outputUnit.value,
  };

  if (!formData.measure) return alert("La longitud ingresada no es válida");
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
    lengthMain.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="http://localhost:9090/length" class="reset-link">Resetear</a><p>
      `;
  } catch (err) {
    console.error("error:", (err as Error).message);
  }
});

// Evento al hacer submit en el formulario de peso
weightForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData: ConvertData = {
    measure: parseFloat(weightForm.weightMeasure.value),
    inputUnit: weightForm.inputUnit.value,
    outputUnit: weightForm.outputUnit.value,
  };

  if (!formData.measure) return alert("El peso ingresado no es válido");
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
    weightMain.innerHTML = `<p class="result">${formData.measure} ${formData.inputUnit} = ${data.result} ${formData.outputUnit}</p>
      <p><a href="http://localhost:9090/weight" class="reset-link">Resetear</a><p>
      `;
  } catch (err) {
    console.error("error:", (err as Error).message);
  }
});
