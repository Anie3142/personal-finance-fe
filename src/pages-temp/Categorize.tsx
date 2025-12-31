import { useState } from 'react';
import { Check, X, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { formatCurrency, formatDate } from '@/lib/format';

const uncategorizedTransactions = [
  { id: '1', merchant: 'POS WITHDRAWAL IKEJA', description: 'Cash withdrawal', amount: 50000, date: '2024-01-05', suggested: 'Cash' },
  { id: '2', merchant: 'GENESIS CINEMAS', description: 'Entertainment', amount: 8500, date: '2024-01-04', suggested: 'Entertainment' },
  { id: '3', merchant: 'SPAR SUPERMARKET', description: 'Groceries', amount: 25000, date: '2024-01-03', suggested: 'Food & Dining' },
  { id: '4', merchant: 'SWEET SENSATION', description: 'Fast food', amount: 3500, date: '2024-01-02', suggested: 'Food & Dining' },
  { id: '5', merchant: 'TOTAL FILLING STATION', description: 'Fuel', amount: 15000, date: '2024-01-01', suggested: 'Transportation' },
];

const quickCategories = [
  { id: 'food', label: 'Food', emoji: '🍕' },
  { id: 'transport', label: 'Transport', emoji: '🚗' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'bills', label: 'Bills', emoji: '💡' },
  { id: 'entertainment', label: 'Fun', emoji: '🎬' },
];

export default function Categorize() {
  const [transactions, setTransactions] = useState(uncategorizedTransactions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createRule, setCreateRule] = useState(false);

  const total = uncategorizedTransactions.length;
  const remaining = transactions.length;
  const progress = ((total - remaining) / total) * 100;

  const handleCategorize = (categoryId: string) => {
    // Remove current transaction
    const newTransactions = transactions.filter((_, i) => i !== currentIndex);
    setTransactions(newTransactions);
    if (currentIndex >= newTransactions.length) {
      setCurrentIndex(Math.max(0, newTransactions.length - 1));
    }
  };

  const handleSkip = () => {
    if (currentIndex < transactions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="container py-6">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">All caught up!</h1>
          <p className="text-muted-foreground mb-6">
            You have no uncategorized transactions. Great job keeping things organized!
          </p>
          <Button variant="outline" onClick={() => setTransactions(uncategorizedTransactions)}>
            Review again
          </Button>
        </div>
      </div>
    );
  }

  const current = transactions[currentIndex];

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categorize Transactions</h1>
        <p className="text-muted-foreground">{remaining} uncategorized transactions</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{total - remaining} of {total}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Transaction card */}
      <div className="max-w-lg mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {remaining}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                disabled={currentIndex === remaining - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <CardTitle className="text-xl">{current.merchant}</CardTitle>
            <CardDescription>{current.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold mb-2">{formatCurrency(current.amount)}</p>
            <p className="text-sm text-muted-foreground mb-6">{formatDate(current.date)}</p>

            {/* Suggested category */}
            {current.suggested && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Suggested category:</p>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {current.suggested}
                </Badge>
                <Button
                  className="ml-2"
                  size="sm"
                  onClick={() => handleCategorize(current.suggested)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
              </div>
            )}

            {/* Quick categories */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Or choose a category:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant="outline"
                    onClick={() => handleCategorize(cat.id)}
                    className="h-12 px-4"
                  >
                    <span className="text-lg mr-2">{cat.emoji}</span>
                    {cat.label}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" className="text-muted-foreground">
                More categories...
              </Button>
            </div>

            {/* Create rule option */}
            <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t">
              <Switch
                id="create-rule"
                checked={createRule}
                onCheckedChange={setCreateRule}
              />
              <Label htmlFor="create-rule" className="text-sm">
                Always categorize "{current.merchant}" this way
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Skip button */}
        <div className="text-center">
          <Button variant="ghost" onClick={handleSkip}>
            <X className="h-4 w-4 mr-2" />
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
