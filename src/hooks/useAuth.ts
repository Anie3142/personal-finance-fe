'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

/**
 * Custom hook that wraps Auth0's useAuth0 hook with additional helpers
 */
export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    error,
  } = useAuth0();

  // Get access token for API calls
  const getToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        },
      });
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }, [getAccessTokenSilently]);

  // Login with redirect to specified path
  const login = useCallback((returnTo?: string) => {
    loginWithRedirect({
      appState: { returnTo: returnTo || window.location.pathname },
    });
  }, [loginWithRedirect]);

  // Logout and redirect to home
  const logoutUser = useCallback(() => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser,
    getToken,
  };
}

export default useAuth;
