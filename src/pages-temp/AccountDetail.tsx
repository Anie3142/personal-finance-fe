import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DeleteConfirmationModal } from '@/components/modals';
import { formatCurrency, formatDate } from '@/lib/format';
import { toast } from '@/hooks/use-toast';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const account = {
  id: '1',
  name: 'GTBank Savings',
  type: 'savings',
  balance: 1500000,
  lastFour: '1234',
  lastSync: '2 minutes ago',
  connectedDate: '2024-01-15',
  currency: 'NGN',
  bank: 'GTBank',
};

const balanceHistory = [
  { date: 'Dec 1', balance: 1200000 },
  { date: 'Dec 8', balance: 1250000 },
  { date: 'Dec 15', balance: 1180000 },
  { date: 'Dec 22', balance: 1350000 },
  { date: 'Dec 29', balance: 1420000 },
  { date: 'Jan 5', balance: 1500000 },
];

const recentTransactions = [
  { id: '1', merchant: 'Salary Credit', amount: 650000, type: 'credit', date: '2024-01-05', category: 'Income' },
  { id: '2', merchant: 'Shoprite', amount: -15000, type: 'debit', date: '2024-01-04', category: 'Food' },
  { id: '3', merchant: 'Uber', amount: -3500, type: 'debit', date: '2024-01-04', category: 'Transport' },
  { id: '4', merchant: 'Netflix', amount: -4400, type: 'debit', date: '2024-01-03', category: 'Entertainment' },
  { id: '5', merchant: 'Transfer to Access', amount: -100000, type: 'debit', date: '2024-01-02', category: 'Transfer' },
];

export default function AccountDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);

  const handleDisconnect = () => {
    toast({
      title: 'Account disconnected',
      description: `${account.name} has been disconnected. Transaction history is preserved.`,
    });
    router.push('/accounts');
  };

  const handleSync = () => {
    toast({
      title: 'Syncing account',
      description: 'Your account will be synced in the background.',
    });
  };

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/accounts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-xl text-primary">
              GT
            </div>
            <div>
              <h1 className="text-2xl font-bold">{account.name}</h1>
              <p className="text-muted-foreground capitalize">{account.bank} • {account.type}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit nickname</DropdownMenuItem>
              <DropdownMenuItem>Reconnect</DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => setDisconnectModalOpen(true)}
              >
                Disconnect account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Balance Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <CardTitle className="text-3xl">{formatCurrency(account.balance)}</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-success text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5% this month</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Balance']}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bank</span>
              <span className="font-medium">{account.bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium capitalize">{account.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account</span>
              <span className="font-medium">•••• {account.lastFour}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span className="font-medium">{account.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connected</span>
              <span className="font-medium">{formatDate(account.connectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last sync</span>
              <span className="font-medium">{account.lastSync}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Link href="/transactions">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    {tx.type === 'credit' ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.merchant}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === 'credit' ? 'text-success' : ''}`}>
                    {tx.type === 'credit' ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.category}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disconnect Account Confirmation Modal */}
      <DeleteConfirmationModal
        open={disconnectModalOpen}
        onOpenChange={setDisconnectModalOpen}
        title="Disconnect Account"
        description={`Are you sure you want to disconnect ${account.name}? Your transaction history will be preserved, but new transactions won't sync automatically.`}
        confirmText="DISCONNECT"
        requireConfirmation={true}
        onConfirm={handleDisconnect}
      />
    </div>
  );
}
