import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { client } from '../../common/request.ts';
import { OAUTH } from '../../common/constants.ts';

type TokenResponse = {
    accessToken: string;
};

type TokenRequest = {
    authorizationCode: string;
    codeVerifier: string;
    redirectUri: string;
};

function RedirectPage() {
    const { mutate, isPending } = useMutation<TokenResponse, Error, TokenRequest>({
        mutationFn: (req: TokenRequest): Promise<TokenResponse> => {
            return client.sendRequest<TokenResponse>('POST', '/token', {
                authorizationCode: req.authorizationCode,
                codeVerifier: req.codeVerifier,
                redirectUri: req.redirectUri,
            });
        },
        onSuccess: (data: TokenResponse) => {
            console.log(data.accessToken);
            client.redirect('/');
        },
    });

    useEffect(() => {
        mutate({
            authorizationCode: '',
            codeVerifier: '',
            redirectUri: OAUTH.GOOGLE.REDIRECT_URI,
        });
    }, [mutate]);

    return (
        <div>
            {isPending ? 'Loading...' : ''}
            <h1>Get Token from Backend</h1>
        </div>
    );
}

export default RedirectPage;
