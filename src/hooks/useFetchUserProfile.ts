import { useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import { useUserStore, UserProfile } from '../store/userStore';

export interface UserinfoResponse {
    user: UserProfile;
}

export function useFetchUserProfile() {
    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        apiClient
            .sendRequest<UserinfoResponse>('GET', '/oauth/userinfo', {
                withCredentials: true,
            })
            .then((data) => setUser(data.user))
            .catch(() => setUser(null));
    }, [setUser]);
}
