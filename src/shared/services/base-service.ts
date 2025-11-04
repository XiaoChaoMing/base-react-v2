import { ApiClient } from './api-client';
import type { AxiosRequestConfig } from 'axios';

export abstract class BaseService {
  protected apiClient: ApiClient;

  constructor(config?: AxiosRequestConfig) {
    this.apiClient = new ApiClient(config);
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.apiClient.get<T>(url, config);
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.post<T>(url, data, config);
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.put<T>(url, data, config);
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.delete<T>(url, config);
  }

  protected async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.patch<T>(url, data, config);
  }
}