import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, Utensils, Car, Film, Lightbulb, ShoppingBag, Heart } from 'lucide-react';

const templates = [
  {
    id: '50-30-20',
    name: '50/30/20 Rule',
    description: 'Needs 50%, Wants 30%, Savings 20%',
    popular: true,
  },
  {
    id: 'scratch',
    name: 'Start from scratch',
    description: 'Create your own custom budgets',
    popular: false,
  },
];

const suggestedBudgets = [
  { icon: Utensils, name: 'Food & Dining', amount: 80000, color: 'text-orange-500' },
  { icon: Car, name: 'Transportation', amount: 40000, color: 'text-blue-500' },
  { icon: Film, name: 'Entertainment', amount: 30000, color: 'text-purple-500' },
  { icon: Lightbulb, name: 'Bills & Utilities', amount: 50000, color: 'text-yellow-500' },
  { icon: ShoppingBag, name: 'Shopping', amount: 25000, color: 'text-pink-500' },
  { icon: Heart, name: 'Health', amount: 20000, color: 'text-red-500' },
];

export default function OnboardingBudgets() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('50-30-20');

  const handleContinue = () => {
    router.push('/onboarding/complete');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link href="/onboarding/connect" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Set your first budget</CardTitle>
            <CardDescription>Choose a template or start from scratch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Templates */}
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{template.name}</span>
                        {template.popular && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Suggested budgets */}
            {selectedTemplate === '50-30-20' && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Suggested budgets</h4>
                <div className="space-y-2">
                  {suggestedBudgets.map((budget) => (
                    <div
                      key={budget.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg bg-secondary flex items-center justify-center ${budget.color}`}>
                          <budget.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{budget.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(budget.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleContinue}
              className="w-full h-12"
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
