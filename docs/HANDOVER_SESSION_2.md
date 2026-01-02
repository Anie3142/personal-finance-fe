# Handover Document - Session 3

**Key Locations:**
- Frontend URL: `https://personal-finance.namelesscompany.cc`
- Backend URL: `https://personal-finance-api.namelesscompany.cc`
- Frontend path: `/Users/aniebiet-abasiudo/code-repo/personal-finance-fe`
- Backend path: `/Users/aniebiet-abasiudo/code-repo/personal-finance-be`
- Infrastructure path: `/Users/aniebiet-abasiudo/code-repo/namesless-company-infra`

## ✅ Issues Resolved

### 1. 403 Forbidden on API Calls
**Problem:** The API client used by pages like Budgets, Categories, and Goals was making requests without an Authorization header, causing the backend (which correctly checks for tokens) to reject them with 403.
**Fix:**
- Created `src/components/auth/AuthTokenSync.tsx` which listens for authentication and silently acquires the Access Token.
- Integrated `AuthTokenSync` into `src/components/providers.tsx` to automatically set the token on the global `api` client.
- **Outcome:** API calls now include the specific Bearer token for `https://personal-finance-api.namelesscompany.cc`.

### 2. Auth0 Login & Legacy Code
**Problem:** The app had remnants of `@auth0/nextjs-auth0` (server-side) which caused 500 errors on routes like `/api/auth/login`.
**Fix:**
- Removed all legacy `/api/auth/*` routes and `src/lib/auth0.ts`.
- Updated `Login.tsx` and `Signup.tsx` to use the client-side `useAuth().login()` flow properly.
- **Outcome:** Login flow is smooth and stays client-side.

### 3. Git Repository Cleanup
**Problem:** Git was tracking hundreds of build artifacts (`.open-next/`, etc.).
**Fix:**
- Ran `git rm -r --cached .open-next` to clean the index.
- Updated `.gitignore` to include `tsconfig.tsbuildinfo` and insure `build/`, `dist/` are ignored.

### 4. Infrastructure & Backend Verification
- **Backend Code:** Checked `backend/config/settings/base.py`.
    - `AUTH0_API_AUDIENCE` defaults to `https://personal-finance-api.namelesscompany.cc` (Correct).
    - `CORS_ALLOWED_ORIGINS` defaults to include `https://personal-finance.namelesscompany.cc` (Correct).
- **Backend Auth:** Confirmed `Auth0JWTAuthentication` class correctly validates Audience and Issuer.

## ℹ️ Notes on Console Errors

You may still see the following errors in your developer console. **These are benign and can be ignored**:

1.  `GET https://accounts.google.com/generate_204?... net::ERR_BLOCKED_BY_CLIENT`
2.  `POST https://play.google.com/log?... net::ERR_BLOCKED_BY_CLIENT`

**Explanation:** These are Google's telemetry/tracking requests triggered during the Auth0/Google login flow. They are being blocked by your browser's ad-blocker (e.g., uBlock Origin) or privacy settings. They do **not** affect the functionality of the application.

## ⚠️ Infrastructure Observation
In `namesless-company-infra/infra/live/30-apps/hello-django/main.tf`:
- The `DJANGO_SETTINGS_MODULE` is set to `"hello_django.settings"`.
- However, the actual backend code uses the structure `config.settings.*`.
- **Recommendation:** If you encounter backend startup issues in the future, check if this environment variable needs to be updated to `"config.settings.prod"`. If the app is currently working, the container entrypoint might be handling this or the image is built differently.

## Deployment Status
- **Frontend:** Fixes pushed to `main`. CI/CD should deploy automatically.
- **Backend:** Code is correct. No changes required for these specifics.
