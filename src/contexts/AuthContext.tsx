'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { 
    user: auth0User, 
    isLoading, 
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();

  // Map Auth0 user to our User type
  const user: User | null = auth0User ? {
    id: auth0User.sub || '',
    email: auth0User.email || '',
    name: auth0User.name || '',
    picture: auth0User.picture || undefined,
  } : null;

  const login = () => {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// For backwards compatibility - re-export as useAuth
export const useAuth = useAuthContext;
