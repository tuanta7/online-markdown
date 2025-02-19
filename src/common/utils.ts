import { OAUTH } from './constants.ts';
import { generateRandomString } from './random.ts';
import request, { AxiosResponse } from 'axios';

export const oauth = {
    generateCodeVerifier: (len: number): string => {
        if (len < OAUTH.CODE_VERIFIER_MIN_LENGTH || len > OAUTH.CODE_VERIFIER_MAX_LENGTH) {
            throw new Error(
                `Length must be between ${OAUTH.CODE_VERIFIER_MIN_LENGTH} and ${OAUTH.CODE_VERIFIER_MAX_LENGTH} characters.`,
            );
        }
        return generateRandomString(len);
    },
    createS256CodeChallenge: async (codeVerifier: string, useS256: boolean): Promise<string> => {
        if (useS256) {
            const encoder = new TextEncoder();
            const digest = await crypto.subtle.digest('SHA-256', encoder.encode(codeVerifier));
            const rawCodeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)));
            return rawCodeChallenge.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // PKCE requirements
        } else return codeVerifier;
    },
};

export const httpClient = {
    redirect: (target: string): void => {
        window.location.replace(target);
    },
    sendRequest: async <T>(
        method: string,
        url: string,
        payload?: unknown,
        headers?: Record<string, string>,
    ): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await request(method, {
                headers,
                url,
                data: payload,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
