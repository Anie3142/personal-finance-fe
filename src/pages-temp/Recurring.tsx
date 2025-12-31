import { useState, useEffect } from 'react';
import { Plus, Calendar, CheckCircle, Clock, Repeat, MoreVertical, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency, formatDate } from '@/lib/format';
import { RecurringModal } from '@/components/modals';
import { toast } from '@/hooks/use-toast';
import { EmptyState, LoadingSkeleton } from '@/components/common';

type BillStatus = 'active' | 'paused';

interface Bill {
  id: string;
  name: string;
  amount: number;
  frequency: 'Monthly' | 'Yearly';
  nextDate: string;
  icon: string;
  daysUntil: number;
  status: BillStatus;
}

const initialBills: Bill[] = [
  { id: '1', name: 'Netflix', amount: 4400, frequency: 'Monthly', nextDate: '2025-01-05', icon: '🎬', daysUntil: 5, status: 'active' },
  { id: '2', name: 'DSTV', amount: 21000, frequency: 'Monthly', nextDate: '2025-01-01', icon: '📺', daysUntil: 1, status: 'active' },
  { id: '3', name: 'Spotify', amount: 2900, frequency: 'Monthly', nextDate: '2025-01-10', icon: '🎵', daysUntil: 10, status: 'paused' },
  { id: '4', name: 'Electricity', amount: 15000, frequency: 'Monthly', nextDate: '2025-01-15', icon: '💡', daysUntil: 15, status: 'active' },
  { id: '5', name: 'Internet', amount: 12000, frequency: 'Monthly', nextDate: '2025-01-20', icon: '🌐', daysUntil: 20, status: 'active' },
  { id: '6', name: 'Rent', amount: 250000, frequency: 'Yearly', nextDate: '2025-06-01', icon: '🏠', daysUntil: 152, status: 'active' },
];

const income = [
  { id: '1', name: 'Salary', amount: 650000, frequency: 'Monthly' as const, nextDate: '2025-01-25', icon: '💰' },
  { id: '2', name: 'Freelance Retainer', amount: 100000, frequency: 'Monthly' as const, nextDate: '2025-01-15', icon: '💻' },
];

export default function Recurring() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bills, setBills] = useState<Bill[]>(initialBills);
  
  // Calculate upcoming bills for next 30 days (active only)
  const upcomingBills = bills.filter(b => b.daysUntil <= 30 && b.status === 'active');
  const upcomingTotal = upcomingBills.reduce((sum, b) => sum + b.amount, 0);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // For demo purposes - toggle this to see empty state
  const showEmptyState = false;
  const billsList = showEmptyState ? [] : bills;
  const incomeList = showEmptyState ? [] : income;

  const handleMarkAsPaid = (name: string) => {
    toast({
      title: 'Marked as paid',
      description: `${name} has been marked as paid for this period.`,
    });
  };

  const handleToggleStatus = (id: string) => {
    setBills(prev => prev.map(bill => {
      if (bill.id === id) {
        const newStatus = bill.status === 'active' ? 'paused' : 'active';
        toast({
          title: newStatus === 'paused' ? 'Subscription paused' : 'Subscription resumed',
          description: `${bill.name} has been ${newStatus === 'paused' ? 'paused' : 'resumed'}.`,
        });
        return { ...bill, status: newStatus };
      }
      return bill;
    }));
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Recurring Transactions</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recurring Transactions</h1>
          <p className="text-muted-foreground">{formatCurrency(upcomingTotal)} due this month</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Add Recurring
        </Button>
      </div>

      {/* Upcoming This Month Timeline Card */}
      {upcomingBills.length > 0 && (
        <Card className="mb-6 bg-gradient-to-br from-warning/5 via-background to-background border-warning/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                <CardTitle className="text-lg">Upcoming This Month</CardTitle>
              </div>
              <span className="text-lg font-bold">{formatCurrency(upcomingTotal)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBills
                .sort((a, b) => a.daysUntil - b.daysUntil)
                .slice(0, 5)
                .map((bill) => (
                  <div key={bill.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 text-center">
                      <span className={`text-xs font-medium ${bill.daysUntil <= 3 ? 'text-destructive' : bill.daysUntil <= 7 ? 'text-warning' : 'text-muted-foreground'}`}>
                        {bill.daysUntil === 0 ? 'Today' : bill.daysUntil === 1 ? 'Tomorrow' : `${bill.daysUntil} days`}
                      </span>
                    </div>
                    <Progress 
                      value={Math.max(5, 100 - (bill.daysUntil / 30) * 100)} 
                      className="h-2 flex-1" 
                      indicatorClassName={bill.daysUntil <= 3 ? 'bg-destructive' : bill.daysUntil <= 7 ? 'bg-warning' : 'bg-primary'}
                    />
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <span className="text-lg">{bill.icon}</span>
                      <span className="font-medium text-sm">{bill.name}</span>
                    </div>
                    <span className="font-semibold text-sm min-w-[80px] text-right">{formatCurrency(bill.amount)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {billsList.length === 0 && incomeList.length === 0 ? (
        <EmptyState
          icon={<Repeat className="h-8 w-8" />}
          title="No recurring transactions"
          description="Set up recurring bills, subscriptions, and income to track them automatically."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />Add Recurring
            </Button>
          }
        />
      ) : (
        <Tabs defaultValue="bills">
          <TabsList className="mb-6">
            <TabsTrigger value="bills">Bills & Subscriptions</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="bills">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {billsList.map((bill) => (
                <Card key={bill.id} className={`group ${bill.status === 'paused' ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{bill.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{bill.name}</h3>
                          {bill.status === 'paused' && (
                            <Badge variant="secondary" className="text-xs">
                              Paused
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{bill.frequency}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleMarkAsPaid(bill.name)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as paid
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(bill.id)}>
                            {bill.status === 'active' ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Resume
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{formatCurrency(bill.amount)}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{formatDate(bill.nextDate)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="income">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {incomeList.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.frequency}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-success">{formatCurrency(item.amount)}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(item.nextDate)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <RecurringModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
