import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Building2, Shield, RefreshCw } from 'lucide-react';

const banks = [
  { id: 'gtbank', name: 'GTBank', color: '#E95420' },
  { id: 'access', name: 'Access Bank', color: '#F68B1E' },
  { id: 'firstbank', name: 'First Bank', color: '#002D62' },
  { id: 'uba', name: 'UBA', color: '#ED1C24' },
  { id: 'zenith', name: 'Zenith Bank', color: '#ED1C24' },
  { id: 'kuda', name: 'Kuda', color: '#40196D' },
  { id: 'opay', name: 'OPay', color: '#1DCE80' },
  { id: 'palmpay', name: 'PalmPay', color: '#8B5CF6' },
];

export default function OnboardingConnect() {
  const router = useRouter();

  const handleConnectBank = () => {
    // This would open Mono Connect widget
    // For demo, skip to next step
    router.push('/onboarding/budgets');
  };

  const handleSkip = () => {
    router.push('/onboarding/budgets');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link href="/onboarding/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Connect your bank</CardTitle>
            <CardDescription>
              Securely link your accounts to automatically import transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bank logos grid */}
            <div className="grid grid-cols-4 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={handleConnectBank}
                  className="h-14 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-colors flex items-center justify-center group"
                >
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground truncate px-1">
                    {bank.name}
                  </span>
                </button>
              ))}
            </div>

            <Button 
              onClick={handleConnectBank}
              className="w-full h-12"
              size="lg"
            >
              Connect Bank
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-primary" />
                <span>Auto sync</span>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                Skip for now
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
