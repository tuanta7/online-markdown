import { env } from '../utils/config.ts';
import { apiClient } from '../services/apiClient.ts';
import { generateState } from '../utils/oauth.ts';

export function useGoogleLoginRedirect() {
    return async () => {
        const state = generateState();

        sessionStorage.setItem('state', state);

        const queryParams = new URLSearchParams({
            client_id: env.CLIENT_ID,
            redirect_uri: env.REDIRECT_URI,
            response_type: env.RESPONSE_TYPE,
            scope: env.SCOPES.join(' '),
            state: state,
            include_granted_scopes: 'true',
            prompt: 'consent',
        });

        const googleAuthorizeUrl = env.AUTHORIZE_ENDPOINT + '?' + queryParams.toString();
        apiClient.redirect(googleAuthorizeUrl);
    };
}
