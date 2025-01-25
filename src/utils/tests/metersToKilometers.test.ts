import { describe, expect, it } from 'vitest';

import { metersToKilometers } from '@/utils/metersToKilometers';

describe('metersToKilometers', () => {
  it('should convert meters to kilometers correctly', () => {
    expect(metersToKilometers(1000)).toBe('1km');
    expect(metersToKilometers(5000)).toBe('5km');
    expect(metersToKilometers(0)).toBe('0km');
    expect(metersToKilometers(10000)).toBe('10km'); //Example from page.tsx
    expect(metersToKilometers(12345)).toBe('12km'); //Test with a non-multiple of 1000
    expect(metersToKilometers(100000)).toBe('100km'); //Test with a large value
  });
});
