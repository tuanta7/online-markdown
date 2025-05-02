import request, { AxiosResponse } from 'axios';
import { API } from './constants.ts';

function redirect(target: string): void {
    window.location.replace(target);
}

async function sendRequest<T>(
    method: string,
    path: string,
    payload?: unknown,
    headers?: Record<string, string>,
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await request(method, {
            headers: headers,
            url: API.BASE_URL + path,
            data: payload,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const client = { redirect, sendRequest };
