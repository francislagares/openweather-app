import { describe, expect, it } from 'vitest';

import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';

describe('getDayOrNightIcon', () => {
  it('should return the correct icon based on time of day', () => {
    expect(getDayOrNightIcon('01d', '2024-03-08T10:00:00Z')).toBe('01d'); // Daytime
    expect(getDayOrNightIcon('01n', '2024-03-08T22:00:00Z')).toBe('01n'); // Nighttime
    expect(getDayOrNightIcon('10d', '2024-03-08T05:00:00Z')).toBe('10d'); //Before 6 AM
    expect(getDayOrNightIcon('10n', '2024-03-08T19:00:00Z')).toBe('10n'); //After 6 PM
    expect(getDayOrNightIcon('02d', '2024-03-08T12:00:00Z')).toBe('02d'); //Midday
    expect(getDayOrNightIcon('02n', '2024-03-08T00:00:00Z')).toBe('02n'); //Midnight
  });
});
