import request, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { API } from '../utils/config.ts';

function redirect(target: string): void {
    window.location.replace(target);
}

async function sendRequest<T>(method: string, path: string, config?: AxiosRequestConfig<unknown>): Promise<T> {
    try {
        const response: AxiosResponse<T> = await request(API.BASE_URL + path, {
            method: method,
            ...config,
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                // If the error has a response, it means the server responded with an error status
                const serverMessage = error.response.data?.message;
                throw new Error(serverMessage || error.message);
            }
            throw new Error('Network error: ' + error.message);
        }
        throw error;
    }
}

export const apiClient = { redirect, sendRequest };
