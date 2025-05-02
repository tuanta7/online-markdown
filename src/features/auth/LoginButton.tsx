import React from 'react';

import Button from '../../components/Button.tsx';

import { OAUTH } from '../../common/constants.ts';
import { client } from '../../common/request.ts';
import GoogleIcon from '../../components/GoogleIcon.tsx';
import { randomString } from '../../common/random.ts';
import { generateCodeVerifier, generateS256CodeChallenge } from '../../common/oauth.ts';

function LoginButton() {
    const mutation = {
        isPending: false,
    };

    const handleRedirect = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const state = randomString(OAUTH.STATE_DEFAULT_LENGTH);
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateS256CodeChallenge(codeVerifier);

        const queryParams = new URLSearchParams({
            scope: OAUTH.GOOGLE.SCOPES.join(' '),
            redirect_uri: OAUTH.GOOGLE.REDIRECT_URI,
            response_type: OAUTH.GOOGLE.RESPONSE_TYPE,
            client_id: OAUTH.GOOGLE.CLIENT_ID,
            code_challenge_method: OAUTH.GOOGLE.PKCE_CODE_CHALLENGE_METHOD,
            code_challenge: codeChallenge,
            state: state,
        });

        const googleAuthorizeUrl = OAUTH.GOOGLE.AUTHORIZE_ENDPOINT + '?' + queryParams.toString();
        client.redirect(googleAuthorizeUrl);
    };

    return (
        <Button
            isLoading={mutation.isPending}
            className="btn btn-secondary btn-sm"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleRedirect(e)}
        >
            <GoogleIcon className="w-4 h-4" />
            <span>Login</span>
        </Button>
    );
}

export default LoginButton;
