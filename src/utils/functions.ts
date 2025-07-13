export function convertLength(
  measure: number,
  inputUnit: string,
  outputUnit: string
): number {
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

  const measureInMeters: number = measure * toMeters[inputUnit];
  const result: number = measureInMeters / toMeters[outputUnit];
  return result;
}
export function convertWeight(
  measure: number,
  inputUnit: string,
  outputUnit: string
): number {
  const toGrams: Record<string, number> = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  const measureInGrams: number = measure * toGrams[inputUnit];
  const result: number = measureInGrams / toGrams[outputUnit];
  return result;
}
