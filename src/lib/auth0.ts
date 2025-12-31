/**
 * Auth0 SDK Configuration for Next.js
 * Using @auth0/nextjs-auth0 v3.x
 */
import { initAuth0 } from '@auth0/nextjs-auth0';

// For v3.x, we use initAuth0 or handleAuth
// Most operations are handled through the API routes and client hooks

export const getAuth0Config = () => ({
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  
  routes: {
    postCallback: '/dashboard',
  },
  
  session: {
    rollingDuration: 60 * 60 * 24, // 1 day
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
  },
  
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
});

// For server-side session access, use getSession from the package
export { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
