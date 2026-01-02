import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CheckCircle, TrendingUp, PiggyBank, BarChart3 } from 'lucide-react';

const benefits = [
  { icon: TrendingUp, text: 'Automatic bank sync with Mono' },
  { icon: PiggyBank, text: 'Smart budgeting & savings goals' },
  { icon: BarChart3, text: 'Beautiful financial reports' },
];

export default function Signup() {
  const { loginWithRedirect } = useAuth0();

  const handleAuth0Signup = () => {
    // Trigger Auth0 signup
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        returnTo: '/onboarding/welcome',
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">₦</span>
            </div>
            <span className="text-2xl font-bold text-foreground">NairaTrack</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start your journey to financial freedom</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <benefit.icon className="h-4 w-4 text-primary" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleAuth0Signup}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              Create account with Auth0
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Trust badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2 text-xs">
            <Shield className="h-4 w-4 text-primary" />
            <span>256-bit encryption</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Lock className="h-4 w-4 text-primary" />
            <span>Bank-grade security</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>NDPR compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
