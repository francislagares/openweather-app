import { describe, expect, it } from 'vitest';

import { convertWindSpeed } from '@/utils/convertWindSpeed';

describe('convertWindSpeed', () => {
  it('should convert meters per second to kilometers per hour correctly', () => {
    expect(convertWindSpeed(1)).toBe('4km/h');
    expect(convertWindSpeed(10)).toBe('36km/h');
    expect(convertWindSpeed(0)).toBe('0km/h');
    expect(convertWindSpeed(1.64)).toBe('6km/h'); //Example from page.tsx
    expect(convertWindSpeed(100)).toBe('360km/h'); //Test with a large value
    expect(convertWindSpeed(-5)).toBe('-18km/h'); //Test with a negative value
  });
});
