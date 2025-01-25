import { describe, expect, it } from 'vitest';

import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

describe('convertKelvinToCelsius', () => {
  it('should convert Kelvin to Celsius correctly', () => {
    expect(convertKelvinToCelsius(273.15)).toBe(0);
    expect(convertKelvinToCelsius(300)).toBe(26);
    expect(convertKelvinToCelsius(0)).toBe(-274);
    expect(convertKelvinToCelsius(296.37)).toBe(23); //Example from page.tsx
    expect(convertKelvinToCelsius(273.15)).toBe(0); //Test with a boundary condition
    expect(convertKelvinToCelsius(-10)).toBe(-284); //Test with a negative value
  });
});
