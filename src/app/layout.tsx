'use client';

import './globals.css';
import { Auth0Provider } from '@auth0/auth0-react';

// Auth0 configuration (these are public values, safe to expose)
const AUTH0_CONFIG = {
  domain: 'dev-54nxe440ro81hlb6.us.auth0.com',
  clientId: 'SM3sFfXc1ntYVIeWY1g16pVnuSsYUI7k',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use window.location.origin for redirect to work on any domain (localhost, preview, production)
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <html lang="en">
      <body>
        <Auth0Provider
          domain={AUTH0_CONFIG.domain}
          clientId={AUTH0_CONFIG.clientId}
          authorizationParams={{
            redirect_uri: redirectUri,
          }}
        >
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
