import { useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import { useUserStore, UserProfile } from '../store/userStore';
import { env } from '../utils/config';

type ProviderUserinfo = {
    sub?: string;
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
    [k: string]: unknown;
};

// Fetch provider userinfo endpoint using access_token as query parameter and map to UserProfile
export function useFetchUserProfile() {
    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            setUser(null);
            return;
        }

        const url = `${env.USERINFO_ENDPOINT}?access_token=${encodeURIComponent(token)}`;
        apiClient
            .sendRequest<ProviderUserinfo>('GET', url)
            .then((data) => {
                const user: UserProfile = {
                    id: (data.sub ?? data.id ?? '') as string,
                    displayName: (data.name ?? data.email ?? '') as string,
                    email: (data.email ?? '') as string,
                    avatarUrl: (data.picture as string | undefined) ?? undefined,
                };
                setUser(user);
            })
            .catch((err) => {
                console.error('Failed to fetch userinfo', err);
                setUser(null);
            });
    }, [setUser]);
}
