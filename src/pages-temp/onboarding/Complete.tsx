import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutDashboard, Building2, Target, PartyPopper, CheckCircle } from 'lucide-react';

const actions = [
  {
    icon: LayoutDashboard,
    title: 'View dashboard',
    description: 'See your financial overview',
    href: '/dashboard',
    primary: true,
  },
  {
    icon: Building2,
    title: 'Add another bank',
    description: 'Connect more accounts',
    href: '/accounts',
    primary: false,
  },
  {
    icon: Target,
    title: 'Set a savings goal',
    description: 'Start building wealth',
    href: '/goals',
    primary: false,
  },
];

export default function OnboardingComplete() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background with celebration effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md text-center">
        {/* Success icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center mx-auto">
              <PartyPopper className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-success flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success-foreground" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">You're all set!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your account is ready. Here's what you can do next:
        </p>

        {/* Action cards */}
        <div className="space-y-3 mb-8">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className={`border-border/50 transition-all hover:border-primary/50 ${
                action.primary ? 'bg-primary/5' : 'bg-card/80'
              }`}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    action.primary ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <action.icon className={`h-6 w-6 ${
                      action.primary ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link href="/dashboard">
          <Button size="lg" className="h-12 px-8 text-base font-medium">
            Go to Dashboard
          </Button>
        </Link>

        {/* Progress indicator - complete */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
