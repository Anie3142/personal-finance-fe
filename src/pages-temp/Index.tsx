import Link from 'next/link';
import { ArrowRight, Shield, Zap, PiggyBank, Target, BarChart3, Repeat, CheckCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  { icon: Zap, title: 'Bank Sync', description: 'Connect your Nigerian bank accounts securely with Mono' },
  { icon: PiggyBank, title: 'Smart Budgets', description: 'Set budgets and track spending by category automatically' },
  { icon: Target, title: 'Savings Goals', description: 'Reach your financial goals with visual progress tracking' },
  { icon: BarChart3, title: 'Reports', description: 'Understand your money with beautiful charts and insights' },
  { icon: Repeat, title: 'Bill Tracking', description: 'Never miss a payment with recurring transaction alerts' },
  { icon: Shield, title: 'Bank-Grade Security', description: '256-bit encryption keeps your data safe and private' },
];

const steps = [
  { num: '1', title: 'Connect Your Banks', description: 'Link your accounts securely in under 2 minutes' },
  { num: '2', title: 'Categorize Spending', description: 'AI automatically sorts your transactions' },
  { num: '3', title: 'Achieve Your Goals', description: 'Watch your savings grow with smart insights' },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['1 bank connection', 'Basic transaction tracking', 'Monthly spending reports', '3 budget categories', '1 savings goal'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₦1,500',
    period: '/month',
    description: 'For serious money managers',
    features: ['Unlimited bank connections', 'Advanced insights & analytics', 'Unlimited budgets & goals', 'CSV & PDF exports', 'Priority support', 'Bill reminders'],
    cta: 'Go Premium',
    highlight: true,
  },
  {
    name: 'Family',
    price: '₦3,000',
    period: '/month',
    description: 'Manage finances together',
    features: ['Everything in Premium', 'Up to 5 family members', 'Shared budgets & goals', 'Family spending reports', 'Parental controls', 'Dedicated account manager'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">NairaTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-5" />
        <div className="container text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Take Control of Your Money with Africa's{' '}
              <span className="text-primary">Smartest Finance App</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Connect your Nigerian bank accounts, track spending, set budgets, and reach your savings goals — all in one beautiful app.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input placeholder="Enter your email" className="h-12" />
              <Button size="lg" className="h-12 gap-2" asChild>
                <Link href="/dashboard">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> Free to start</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> NDPR compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Everything You Need to Manage Money</h2>
            <p className="text-muted-foreground">Powerful features designed for the Nigerian market</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Get started in just 3 simple steps</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {s.num}
                </div>
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Choose the plan that works for you</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative flex flex-col ${plan.highlight ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'} asChild>
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Take Control?</h2>
          <p className="mb-8 text-primary-foreground/80">Join thousands of Nigerians managing their money smarter</p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/dashboard">Start Free Today <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 NairaTrack. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
