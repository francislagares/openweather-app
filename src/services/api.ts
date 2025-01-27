import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import config from '@/config/env';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.env.baseUrl,
      params: {
        appid: config.env.apiKey,
      },
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        console.log('Request Interceptor:', config);
        return config;
      },
      error => {
        console.error('Request Error Interceptor:', error);
        return Promise.reject(error);
      },
    );

    // Add response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('Response Interceptor:', response);
        return response.data;
      },
      (error: AxiosError) => {
        console.error('Response Error Interceptor:', error);
        return Promise.reject(error);
      },
    );
  }

  // Generic GET method
  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });

      return response;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  // Handle errors
  private handleError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || 'An unexpected error occurred';
    }
    return 'An unexpected error occurred';
  }
}

export const apiClient = new ApiClient();
