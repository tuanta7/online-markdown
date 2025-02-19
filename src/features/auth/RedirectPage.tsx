import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../common/utils.ts';
import { API } from '../../common/constants.ts';

type Response = {
    accessToken: string;
};

type Arguments = {
    authorizationCode: string;
    codeVerifier: string;
};

function RedirectPage() {
    const { mutate, isPending } = useMutation<Response, Error, Arguments>({
        mutationFn: ({ authorizationCode, codeVerifier }: Arguments): Promise<Response> => {
            return httpClient.sendRequest<Response>('POST', API.BASE_URL + '/google/token', {
                authorizationCode,
                codeVerifier,
            });
        },
        onSuccess: (data: Response) => {
            console.log(data.accessToken);
            httpClient.redirect('/');
        },
    });

    useEffect(() => {
        mutate({ authorizationCode: '', codeVerifier: '' });
    }, [mutate]);

    return (
        <div>
            {isPending ? 'Loading...' : ''}
            <h1>Get Token from Backend</h1>
        </div>
    );
}

export default RedirectPage;
