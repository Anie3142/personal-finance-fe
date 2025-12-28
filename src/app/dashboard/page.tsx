'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Home, CreditCard, Receipt, BarChart3, Settings, LogOut, Bell, TrendingUp, TrendingDown, Wallet, Building2, Plus, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Area, AreaChart } from 'recharts';

const balanceHistory = [
  { month: 'Jul', balance: 45000 }, { month: 'Aug', balance: 48500 }, { month: 'Sep', balance: 52000 },
  { month: 'Oct', balance: 49800 }, { month: 'Nov', balance: 54200 }, { month: 'Dec', balance: 58750 },
];

const spendingByCategory = [
  { name: 'Housing', value: 2500, color: '#3b82f6' },
  { name: 'Food', value: 800, color: '#8b5cf6' },
  { name: 'Transport', value: 450, color: '#06b6d4' },
  { name: 'Entertainment', value: 350, color: '#10b981' },
  { name: 'Shopping', value: 600, color: '#f59e0b' },
];

const monthlyData = [
  { month: 'Jul', income: 7500, expenses: 4800 }, { month: 'Aug', income: 7500, expenses: 5200 },
  { month: 'Sep', income: 8000, expenses: 4500 }, { month: 'Oct', income: 7500, expenses: 5800 },
  { month: 'Nov', income: 8500, expenses: 5100 }, { month: 'Dec', income: 9000, expenses: 5000 },
];

const accounts = [
  { name: 'Chase Checking', type: 'Checking', balance: 12450, icon: Building2, color: 'from-blue-500 to-blue-600' },
  { name: 'Chase Savings', type: 'Savings', balance: 28300, icon: Building2, color: 'from-green-500 to-green-600' },
  { name: 'Fidelity 401k', type: 'Investment', balance: 45000, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  { name: 'Amex Platinum', type: 'Credit Card', balance: -2450, icon: CreditCard, color: 'from-amber-500 to-amber-600' },
];

const recentTransactions = [
  { name: 'Amazon', category: 'Shopping', amount: -89.99, date: 'Dec 28' },
  { name: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Dec 27' },
  { name: 'Uber Eats', category: 'Food', amount: -32.50, date: 'Dec 26' },
  { name: 'Netflix', category: 'Entertainment', amount: -15.99, date: 'Dec 25' },
  { name: 'Whole Foods', category: 'Food', amount: -127.45, date: 'Dec 24' },
];

const navItems = [
  { icon: Home, label: 'Overview' },
  { icon: CreditCard, label: 'Accounts' },
  { icon: Receipt, label: 'Transactions' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export default function Dashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/');
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900/50 border-r border-slate-800/50 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">FinanceHub</span>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lg:hidden flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="hidden sm:flex items-center h-10 px-4 bg-slate-800/50 border border-slate-700/50 rounded-xl w-64">
                <Search className="w-4 h-4 text-slate-400" />
                <input className="bg-transparent border-none outline-none px-3 text-sm w-full placeholder-slate-400" placeholder="Search..." />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-600/25">
                <Plus className="w-4 h-4" /> Add Transaction
              </button>
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <img src={user?.picture || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-full ring-2 ring-slate-700" />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name?.split(' ')[0] || 'User'}</p>
                  <p className="text-xs text-slate-400">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-8">
          {/* Welcome + Stats */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
            <p className="text-slate-400">Here's your financial overview for December</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-600/20">
              <div className="flex justify-between items-start mb-4">
                <p className="text-blue-100 text-sm font-medium">Net Worth</p>
                <Wallet className="w-5 h-5 text-blue-200" />
              </div>
              <p className="text-3xl font-bold mb-1">${totalBalance.toLocaleString()}</p>
              <p className="text-blue-200 text-sm flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +8.3% this month</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-400 text-sm font-medium">Monthly Income</p>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold mb-1">$9,000</p>
              <p className="text-green-500 text-sm">+$500 vs last month</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-400 text-sm font-medium">Monthly Expenses</p>
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold mb-1">$5,000</p>
              <p className="text-red-500 text-sm">-$100 vs last month</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-400 text-sm font-medium">Savings Rate</p>
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold mb-1">44%</p>
              <p className="text-purple-500 text-sm">Above target (30%)</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Net Worth Trend */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="font-bold text-lg mb-6">Net Worth Trend</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Spending Pie */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="font-bold text-lg mb-6">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={spendingByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {spendingByCategory.slice(0, 4).map((c) => (
                  <div key={c.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></div>
                    <span className="text-slate-400">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Income vs Expenses */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="font-bold text-lg mb-6">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Accounts & Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Linked Accounts */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Linked Accounts</h3>
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-3">
                {accounts.map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center`}>
                        <acc.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{acc.name}</p>
                        <p className="text-xs text-slate-400">{acc.type}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${acc.balance < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {acc.balance < 0 ? '-' : ''}${Math.abs(acc.balance).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Recent Transactions</h3>
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <p className="text-xs text-slate-400">{tx.category} • {tx.date}</p>
                    </div>
                    <p className={`font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
