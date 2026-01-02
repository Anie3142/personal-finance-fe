'use client';

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAccessToken, clearTokenCache } from '@/lib/api';

/**
 * Component that syncs the Auth0 access token with the API client.
 * This ensures that API calls made via the api.ts client have the correct token.
 */
export function AuthTokenSync({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const syncToken = async () => {
            if (isLoading) return;

            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                        },
                    });
                    setAccessToken(token);
                } catch (error) {
                    console.error('Error getting access token:', error);
                    clearTokenCache();
                }
            } else {
                clearTokenCache();
            }
        };

        syncToken();
    }, [isAuthenticated, isLoading, getAccessTokenSilently]);

    return <>{children}</>;
}

export default AuthTokenSync;
