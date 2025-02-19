import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.configService.get('CORE_APP_BASE_URL'),
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
        ...config,
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
