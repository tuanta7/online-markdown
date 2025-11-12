// Extend the Window interface to include __ENV__
declare global {
    interface Window {
        __ENV__: Config;
    }
}

interface Config {
    AUTHORIZE_ENDPOINT: string;
    USERINFO_ENDPOINT: string;
    RESPONSE_TYPE: string;
    REDIRECT_URI: string;
    CLIENT_ID: string;
    SCOPES: string[];
    STATE_LENGTH: number;
}

export const env: Config = window.__ENV__;
