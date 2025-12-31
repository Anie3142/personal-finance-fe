// Currency formatting for Nigerian Naira
export function formatCurrency(
  amount: number,
  currency: string = 'NGN',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

// Compact currency format for large numbers
export function formatCurrencyCompact(amount: number, currency: string = 'NGN'): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
}

// Date formatting
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d);
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, { month: 'short', day: 'numeric' });
}

export function formatDateLong(date: string | Date): string {
  return formatDate(date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Percentage formatting
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

// Number formatting
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-NG').format(value);
}

// Account number masking
export function maskAccountNumber(number: string): string {
  if (number.length <= 4) return number;
  return `****${number.slice(-4)}`;
}

// Transaction type helpers
export function isDebit(type: 'debit' | 'credit'): boolean {
  return type === 'debit';
}

export function getTransactionSign(type: 'debit' | 'credit'): string {
  return type === 'debit' ? '-' : '+';
}

// Status helpers
export function getBudgetStatusColor(status: 'on_track' | 'warning' | 'over_budget'): string {
  switch (status) {
    case 'on_track':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'over_budget':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
}

export function getConnectionStatusColor(status: 'connected' | 'needs_reconnection' | 'disconnected'): string {
  switch (status) {
    case 'connected':
      return 'text-success';
    case 'needs_reconnection':
      return 'text-warning';
    case 'disconnected':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
}
