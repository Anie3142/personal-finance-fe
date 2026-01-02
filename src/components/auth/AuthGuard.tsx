'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AuthGuard component that protects routes client-side.
 * If user is not authenticated, it redirects to Auth0 login.
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  // Show loading state while checking auth
  if (isLoading) {
    return fallback || <AuthLoadingFallback />;
  }

  // If not authenticated, show loading (redirect will happen)
  if (!isAuthenticated) {
    return fallback || <AuthLoadingFallback />;
  }

  // Authenticated - render children
  return <>{children}</>;
}

function AuthLoadingFallback() {
  return (
    <div className="container py-6 pb-24 lg:pb-6 space-y-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      <Skeleton className="h-32 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default AuthGuard;
