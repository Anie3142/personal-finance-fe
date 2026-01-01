import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email offline_access',
    },
    returnTo: '/dashboard',
  }),
  callback: handleCallback({
    redirectUri: process.env.AUTH0_BASE_URL,
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
});
