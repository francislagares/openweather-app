import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useWeatherSuggestions from '../useWeatherSuggestions';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useWeatherSuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch suggestions successfully', async () => {
    const mockData = {
      list: [{ name: 'London' }, { name: 'New York' }, { name: 'Paris' }],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useWeatherSuggestions());

    result.current.fetchSuggestions('lon');

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([
        'London',
        'New York',
        'Paris',
      ]);
      expect(result.current.error).toBe('');
      expect(result.current.showSuggestions).toBe(true);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('find?q=lon'),
    );
  });

  it('should handle API errors', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useWeatherSuggestions());

    result.current.fetchSuggestions('lon');

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([]);
      expect(result.current.error).toBe(
        'Failed to fetch suggestions. Please try again later.',
      );
      expect(result.current.showSuggestions).toBe(false);
    });
  });

  it('should not fetch suggestions if query length is less than 3', async () => {
    const { result } = renderHook(() => useWeatherSuggestions());

    result.current.fetchSuggestions('lo');

    expect(mockedAxios.get).not.toHaveBeenCalled();

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.error).toBe('');
    expect(result.current.showSuggestions).toBe(false);
  });
});
