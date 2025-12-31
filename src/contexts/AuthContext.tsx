'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

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
  const { user: auth0User, isLoading: auth0Loading } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth0User) {
      setUser({
        id: auth0User.sub || '',
        email: auth0User.email || '',
        name: auth0User.name || '',
        picture: auth0User.picture || undefined,
      });
    } else {
      setUser(null);
    }
  }, [auth0User]);

  const login = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/login';
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/logout';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: auth0Loading,
        isAuthenticated: !!auth0User,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
