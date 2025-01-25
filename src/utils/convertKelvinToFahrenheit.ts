export function convertKelvinToFahrenheit(tempInKelvin: number): number {
  const tempInFahrenheit = (tempInKelvin - 273.15) * (9 / 5) + 32;
  return Math.floor(tempInFahrenheit);
}
