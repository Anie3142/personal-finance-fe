import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Building2, RefreshCw, MoreVertical, CreditCard, Wallet, TrendingUp, AlertCircle, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@/lib/format';
import { EmptyState, LoadingSkeleton } from '@/components/common';

// Nigerian bank brand colors
const bankColors: Record<string, string> = {
  'gtbank': '#F7931A',
  'access': '#F15A24',
  'zenith': '#ED1C24',
  'firstbank': '#003366',
  'uba': '#E31937',
  'fidelity': '#00A651',
  'stanbic': '#0033A0',
  'sterling': '#E31937',
  'fcmb': '#6A2C91',
  'ecobank': '#0067B1',
  'wema': '#722F37',
  'polaris': '#660066',
  'keystone': '#0066B3',
  'union': '#0066B3',
  'default': '#64748b', // Slate-500 for generic banks
};

function getBankColor(name: string): string {
  const lowercaseName = name.toLowerCase().replace(/\s+/g, ''); // Remove spaces for better matching

  // Direct mapping check first
  if (bankColors[lowercaseName]) return bankColors[lowercaseName];

  for (const [bankKey, color] of Object.entries(bankColors)) {
    // Check if the normalized name includes the key
    if (lowercaseName.includes(bankKey)) {
      return color;
    }
  }
  return bankColors.default;
}

// Sample Nigerian accounts data
const accountsData = {
  bank: [
    { id: '1', name: 'GTBank Savings', type: 'savings', balance: 1500000, lastFour: '1234', lastSync: '2 mins ago', status: 'connected' },
    { id: '2', name: 'Access Current', type: 'current', balance: 350000, lastFour: '5678', lastSync: '5 mins ago', status: 'connected' },
    { id: '3', name: 'Zenith Salary', type: 'savings', balance: 600000, lastFour: '9012', lastSync: '1 hour ago', status: 'needs_reconnection' },
  ],
  credit: [
    { id: '4', name: 'GTBank Credit Card', type: 'credit', balance: -45000, limit: 200000, lastFour: '3456', lastSync: '10 mins ago', status: 'connected' },
  ],
  cash: [
    { id: '5', name: 'Cash Wallet', type: 'cash', balance: 25000, lastSync: 'Manual', status: 'connected' },
  ],
};

const totalBalance = Object.values(accountsData).flat().reduce((sum, acc) => sum + acc.balance, 0);

export default function Accounts() {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // For demo purposes - toggle this to see empty state
  const showEmptyState = false;
  const hasAccounts = !showEmptyState && (accountsData.bank.length > 0 || accountsData.credit.length > 0 || accountsData.cash.length > 0);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (!hasAccounts) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Accounts</h1>
          </div>
        </div>
        <EmptyState
          icon={<Landmark className="h-8 w-8" />}
          title="No accounts connected"
          description="Connect your first bank to get started tracking your finances."
          action={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Bank
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">
            Total balance: <span className="text-foreground font-semibold">{formatCurrency(totalBalance)}</span>
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect Bank
        </Button>
      </div>

      {/* Accounts by type */}
      <Accordion type="multiple" defaultValue={['bank', 'credit', 'cash']} className="space-y-4">
        {/* Bank Accounts */}
        <AccordionItem value="bank" className="border rounded-xl bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Bank Accounts</h3>
                <p className="text-sm text-muted-foreground">{accountsData.bank.length} accounts</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              {accountsData.bank.map((account) => (
                <AccountCard key={account.id} account={account} onSync={handleSync} syncing={syncing} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Credit Cards */}
        <AccordionItem value="credit" className="border rounded-xl bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Credit Cards</h3>
                <p className="text-sm text-muted-foreground">{accountsData.credit.length} card</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              {accountsData.credit.map((account) => (
                <AccountCard key={account.id} account={account} onSync={handleSync} syncing={syncing} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cash */}
        <AccordionItem value="cash" className="border rounded-xl bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-success" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Cash & Manual</h3>
                <p className="text-sm text-muted-foreground">{accountsData.cash.length} account</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              {accountsData.cash.map((account) => (
                <AccountCard key={account.id} account={account} onSync={handleSync} syncing={syncing} />
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add cash account
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Investments - Coming Soon */}
        <Card className="border-dashed">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground">Investments</h3>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </CardContent>
        </Card>
      </Accordion>
    </div>
  );
}

function AccountCard({ account, onSync, syncing }: { account: any; onSync: (id: string) => void; syncing: string | null }) {
  const bankColor = getBankColor(account.name);

  return (
    <Link href={`/accounts/${account.id}`}>
      <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
        <div className="flex items-center gap-4">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: bankColor }}
          >
            {account.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{account.name}</h4>
              {account.status === 'needs_reconnection' && (
                <AlertCircle className="h-4 w-4 text-warning" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="capitalize">{account.type}</span>
              {account.lastFour && <span>•••• {account.lastFour}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`font-semibold ${account.balance < 0 ? 'text-destructive' : ''}`}>
              {formatCurrency(Math.abs(account.balance))}
            </p>
            <p className="text-xs text-muted-foreground">{account.lastSync}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault();
              onSync(account.id);
            }}
          >
            <RefreshCw className={`h-4 w-4 ${syncing === account.id ? 'animate-spin' : ''}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit nickname</DropdownMenuItem>
              <DropdownMenuItem>Reconnect</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Link>
  );
}
