import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, PiggyBank, BarChart3, Sparkles } from 'lucide-react';

export default function OnboardingWelcome() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="h-20 w-20 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-primary-foreground">₦</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to NairaTrack!</h1>
        </div>

        {/* Illustration - abstract finance icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <div className="h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center">
            <PiggyBank className="h-10 w-10 text-primary" />
          </div>
          <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Let's set up your financial dashboard in just a few minutes. We'll help you connect your banks and start tracking your money.
        </p>

        {/* Features preview */}
        <div className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Smart insights</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span>Automatic sync</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span>Beautiful reports</span>
          </div>
        </div>

        <Link href="/onboarding/profile">
          <Button size="lg" className="h-12 px-8 text-base font-medium">
            Get Started
          </Button>
        </Link>

        {/* Progress indicator */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
