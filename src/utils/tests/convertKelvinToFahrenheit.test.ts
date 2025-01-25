import { describe, expect, it } from 'vitest';

import { convertKelvinToFahrenheit } from '@/utils/convertKelvinToFahrenheit';

describe('convertKelvinToFahrenheit', () => {
  it('should convert Kelvin to Fahrenheit correctly', () => {
    expect(convertKelvinToFahrenheit(273.15)).toBe(32);
    expect(convertKelvinToFahrenheit(300)).toBe(80);
    expect(convertKelvinToFahrenheit(0)).toBe(-460);
    expect(convertKelvinToFahrenheit(296.37)).toBe(73); //Example from page.tsx
    expect(convertKelvinToFahrenheit(273.15)).toBe(32); //Test with a boundary condition
    expect(convertKelvinToFahrenheit(-10)).toBe(-478); //Test with a negative value
  });
});
