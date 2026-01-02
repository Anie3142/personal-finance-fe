'use client';

import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthTokenSync } from '@/components/auth/AuthTokenSync';
import { useState } from 'react';

// Auth0 configuration from environment variables
const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
const auth0Audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '';

// Determine redirect URI based on environment
const getRedirectUri = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || 'http://localhost:3000';
};

// Handle redirect callback after Auth0 login - use window.location for navigation
const onRedirectCallback = (appState?: AppState) => {
  // Use window.location for navigation to avoid useRouter issues
  const targetUrl = appState?.returnTo || '/dashboard';
  window.history.replaceState({}, document.title, targetUrl);
  window.location.href = targetUrl;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }));

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: getRedirectUri(),
        audience: auth0Audience,
        scope: 'openid profile email',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AuthTokenSync>
                {children}
              </AuthTokenSync>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}
