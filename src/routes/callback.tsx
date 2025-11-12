import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { apiClient } from '../services/apiClient';

export const Route = createFileRoute('/callback')({
    component: () => <Callback />,
});

function Callback() {
    useEffect(() => {
        const fragment = window.location.hash || '';
        const params = new URLSearchParams(fragment.startsWith('#') ? fragment.slice(1) : fragment);
        const accessToken = params.get('access_token');
        if (accessToken) {
            try {
                sessionStorage.setItem('access_token', accessToken);
            } catch (e) {
                console.error('Failed to persist access_token to sessionStorage', e);
            }
        }

        apiClient.redirect('/workspace');
    }, []);

    return (
        <div className="flex h-[90vh] flex-col items-center justify-center gap-2">
            <div className="flex items-end gap-2">
                <span className="loading loading-infinity loading-xl"></span>
                <span className="text-xl font-bold">Signing you in...</span>
            </div>
            <p>Please wait while we complete your login.</p>
        </div>
    );
}
