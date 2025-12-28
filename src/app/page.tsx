'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shield, TrendingUp, CreditCard, PieChart, ArrowRight, Wallet, Lock, Star, Play, Check } from 'lucide-react';

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const features = [
    { icon: Wallet, title: 'Connect All Accounts', desc: 'Link your bank accounts, credit cards, and investments securely in one place' },
    { icon: PieChart, title: 'Smart Analytics', desc: 'Get powerful insights into your spending with beautiful charts and AI-powered reports' },
    { icon: TrendingUp, title: 'Track Net Worth', desc: 'Monitor your financial growth over time with comprehensive tracking and goals' },
    { icon: Shield, title: 'Bank-Level Security', desc: '256-bit encryption and biometric authentication to protect your data' },
  ];

  const testimonials = [
    { name: 'Sarah M.', location: 'New York', review: "Finally, an app that makes budgeting effortless. It caught subscriptions I forgot about!" },
    { name: 'James T.', location: 'London', review: "The security features gave me peace of mind. Connecting accounts was seamless." },
    { name: 'Emily R.', location: 'Toronto', review: "Beautiful dashboard and insights. Highly recommended for anyone serious about finances." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">FinanceHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#security" className="text-sm text-slate-300 hover:text-white transition-colors">Security</a>
            <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => loginWithRedirect()} className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </button>
            <button onClick={() => loginWithRedirect()} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/25">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Shield className="w-4 h-4" /> Bank-grade security for your finances
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
              Master Your Money
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">with Confidence</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The intelligent finance platform that connects all your accounts, tracks spending, and helps you build lasting wealth with powerful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={() => loginWithRedirect()} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl text-lg font-semibold transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No credit card required</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 14-day free trial</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Cancel anytime</div>
            </div>
          </div>
          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="max-w-5xl mx-auto bg-slate-800/50 rounded-3xl border border-slate-700/50 p-4 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-20 h-20 text-blue-500/30 mx-auto mb-4" />
                  <p className="text-slate-500">Interactive Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-sm text-slate-500 uppercase tracking-wider mb-8">Trusted by industry leaders in security</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['256-bit SSL', 'SOC 2 Certified', 'GDPR Compliant', 'PCI DSS'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-slate-400">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Everything you need to take control of your financial future</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Loved by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-500 fill-current" />)}</div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg">{t.name[0]}</div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to take control?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">Join thousands making smarter financial decisions. Start your free 14-day trial today.</p>
              <button onClick={() => loginWithRedirect()} className="px-10 py-4 bg-white text-blue-600 rounded-2xl text-lg font-bold hover:bg-blue-50 transition-colors shadow-xl">
                Start Free — No Card Required
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">FinanceHub</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm text-slate-500">© 2024 FinanceHub</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
