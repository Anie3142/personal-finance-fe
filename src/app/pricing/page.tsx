'use client';

import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { PiggyBank, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const pricingPlans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '1 bank connection',
      'Basic transaction tracking',
      'Monthly spending reports',
      '3 budget categories',
      '1 savings goal',
    ],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₦1,500',
    period: '/month',
    description: 'For serious money managers',
    features: [
      'Unlimited bank connections',
      'Advanced insights & analytics',
      'Unlimited budgets & goals',
      'CSV & PDF exports',
      'Priority support',
      'Bill reminders',
    ],
    cta: 'Go Premium',
    highlight: true,
  },
  {
    name: 'Family',
    price: '₦3,000',
    period: '/month',
    description: 'Manage finances together',
    features: [
      'Everything in Premium',
      'Up to 5 family members',
      'Shared budgets & goals',
      'Family spending reports',
      'Parental controls',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    isContactSales: true,
    highlight: false,
  },
];

const faqItems = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use 256-bit encryption and are NDPR compliant. Your financial data is never sold or shared with third parties.',
  },
  {
    question: 'What banks are supported?',
    answer: 'We support all major Nigerian banks including GTBank, Access, UBA, Zenith, First Bank, Kuda, OPay, PalmPay, and more.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. Your premium features will remain active until the end of your billing period.',
  },
];

export default function PricingPage() {
  const { user, loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: '/dashboard' },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">NairaTrack</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            {user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button onClick={handleLogin}>Log in</Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="container text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose the plan that works for you. All plans include a 14-day free trial of premium features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.highlight ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
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
                <CardContent className="flex-1 flex flex-col pt-0">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.isContactSales ? (
                    <Button
                      className="w-full"
                      variant={plan.highlight ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href="/contact">{plan.cta}</Link>
                    </Button>
                  ) : user ? (
                    <Button
                      className="w-full"
                      variant={plan.highlight ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href="/dashboard">{plan.cta}</Link>
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.highlight ? 'default' : 'outline'}
                      onClick={handleLogin}
                    >
                      {plan.cta}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl grid gap-6">
            {faqItems.map((item) => (
              <Card key={item.question}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 NairaTrack. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
