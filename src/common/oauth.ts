import { randomString } from './random.ts';
import { OAUTH } from './constants.ts';

function generateCodeVerifier(): string {
    return randomString(OAUTH.CODE_VERIFIER_LENGTH);
}

async function generateS256CodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-256', encoder.encode(codeVerifier));
    const rawCodeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)));

    return rawCodeChallenge.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // PKCE requirements
}

export { generateCodeVerifier, generateS256CodeChallenge };
