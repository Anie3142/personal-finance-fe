'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated (after loading completes)
    if (!isLoading && !user && !error) {
      router.push('/api/auth/login?returnTo=/dashboard');
    }
  }, [user, isLoading, error, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <a href="/api/auth/login" className="text-primary hover:underline">
            Try logging in again
          </a>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated - render dashboard
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
}
