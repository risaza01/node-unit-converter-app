// Función para convertir la longitud
export function convertLength(
  measure: number,
  inputUnit: string,
  outputUnit: string
): number {
  // Objeto que contiene cuánto es 1 medida x en metros
  const toMeters: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };

  // Hacer la conversión en metros y luego pasarla a la unidad de longitud requerida
  const measureInMeters: number = measure * toMeters[inputUnit];
  const result: number = measureInMeters / toMeters[outputUnit];
  return result;
}
// Función para convertir el peso
export function convertWeight(
  measure: number,
  inputUnit: string,
  outputUnit: string
): number {
  // Objeto que contiene cuánto es 1 medida x en gramos
  const toGrams: Record<string, number> = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  // Hacer la conversión en gramos y luego pasarla a la unidad de peso requerida
  const measureInGrams: number = measure * toGrams[inputUnit];
  const result: number = measureInGrams / toGrams[outputUnit];
  return result;
}
// Función para convertir la temperatura
export function convertTemperature(
  measure: number,
  inputUnit: string,
  outputUnit: string
): number {
  let result: number = 0;

  if (inputUnit === "°C" && outputUnit === "°F") {
    result = measure * (9 / 5) + 32;
  } else if (inputUnit === "°C" && outputUnit === "K") {
    result = measure + 273.15;
  } else if (inputUnit === "°F" && outputUnit === "°C") {
    result = (measure - 32) * (5 / 9);
  } else if (inputUnit === "°F" && outputUnit === "K") {
    result = (measure - 32) * (5 / 9) + 273.15;
  } else if (inputUnit === "K" && outputUnit === "°C") {
    result = measure - 273.15;
  } else if (inputUnit === "K" && outputUnit === "°F") {
    result = (measure - 273.15) * (9 / 5) + 32;
  }

  return result;
}
