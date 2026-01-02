'use client';

import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { ArrowRight, Shield, Zap, PiggyBank, Target, BarChart3, Repeat, CheckCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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

// Navigation items
const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '/pricing' },
];

export default function Index() {
  const { user, isLoading, loginWithRedirect, logout } = useAuth0();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: '/dashboard' },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">NairaTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="h-10 w-24 animate-pulse bg-muted rounded-md" />
            ) : user ? (
              // Logged in - show dashboard link and user menu
              <>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              // Not logged in - show login and signup
              <>
                <Button variant="ghost" className="hidden sm:flex" onClick={handleLogin}>
                  Log in
                </Button>
                <Button onClick={handleLogin}>
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-5" />
        <div className="container text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Take Control of Your Money with Africa&apos;s{' '}
              <span className="text-primary">Smartest Finance App</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Connect your Nigerian bank accounts, track spending, set budgets, and reach your savings goals — all in one beautiful app.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input placeholder="Enter your email" className="h-12" />
              {user ? (
                <Button size="lg" className="h-12 gap-2" asChild>
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="h-12 gap-2" onClick={handleLogin}>
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              )}
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
      <section id="features" className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Everything You Need to Manage Money</h2>
            <p className="text-muted-foreground">Powerful features designed for the Nigerian market</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Get started in just 3 simple steps</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.num}
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Take Control?</h2>
          <p className="mb-8 text-primary-foreground/80">Join thousands of Nigerians managing their money smarter</p>
          {user ? (
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="gap-2" onClick={handleLogin}>
              Start Free Today <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 NairaTrack. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
