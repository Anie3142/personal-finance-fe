// User & Auth Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  currency: string;
  timezone: string;
  created_at: string;
}

export interface ProfileUpdate {
  first_name?: string;
  last_name?: string;
  currency?: string;
  timezone?: string;
}

// Connection Types
export interface Connection {
  id: string;
  institution_name: string;
  institution_logo: string;
  status: 'connected' | 'needs_reconnection' | 'disconnected';
  accounts_count: number;
  last_synced_at: string;
  accounts?: Account[];
}

export interface Institution {
  code: string;
  name: string;
  logo_url: string;
}

export interface MonoInitResponse {
  widget_url: string;
  session_token: string;
}

export interface MonoExchangeResponse {
  connection_id: string;
  account_id: string;
}

// Account Types
export interface Account {
  id: string;
  connection_id: string;
  name: string;
  type: 'savings' | 'current' | 'credit';
  account_number_masked: string;
  currency: string;
  balance: number;
  available_balance: number;
  last_synced_at: string;
  recent_transactions?: Transaction[];
}

// Transaction Types
export interface Transaction {
  id: string;
  account_id: string;
  date: string;
  description: string;
  merchant_name: string;
  amount: number;
  type: 'debit' | 'credit';
  category_id: string | null;
  category_name: string | null;
  category_color: string | null;
  notes: string;
  is_recurring: boolean;
  created_at: string;
}

export interface TransactionFilters {
  account_id?: string;
  category_id?: string;
  type?: 'debit' | 'credit';
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface TransactionUpdate {
  category_id?: string;
  notes?: string;
  is_recurring?: boolean;
}

export interface ManualTransaction {
  type: 'debit' | 'credit';
  amount: number;
  date: string;
  description: string;
  category_id: string;
  account_id: string;
  notes?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  is_system: boolean;
  parent_id: string | null;
  transaction_count_this_month: number;
}

export interface CategoryCreate {
  name: string;
  icon: string;
  color: string;
  parent_id?: string;
}

export interface CategoryRule {
  id: string;
  match_type: 'contains' | 'starts_with' | 'exact' | 'regex';
  pattern: string;
  category_id: string;
  category_name: string;
  is_active: boolean;
  applied_count: number;
}

export interface CategoryRuleCreate {
  match_type: 'contains' | 'starts_with' | 'exact' | 'regex';
  pattern: string;
  category_id: string;
  apply_to_existing?: boolean;
}

// Budget Types
export interface Budget {
  id: string;
  category_id: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  spent: number;
  remaining: number;
  percentage: number;
  status: 'on_track' | 'warning' | 'over_budget';
  rollover?: boolean;
}

export interface BudgetProgress {
  spent: number;
  remaining: number;
  daily_average: number;
  projected_total: number;
  days_remaining: number;
}

export interface BudgetCreate {
  category_id: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  rollover?: boolean;
}

// Goal Types
export interface Goal {
  id: string;
  name: string;
  emoji: string;
  target_amount: number;
  current_amount: number;
  percentage: number;
  target_date: string | null;
  monthly_contribution_needed: number;
  status: 'active' | 'completed';
  contributions?: GoalContribution[];
}

export interface GoalContribution {
  id: string;
  amount: number;
  date: string;
}

export interface GoalCreate {
  name: string;
  emoji: string;
  target_amount: number;
  target_date?: string;
  linked_account_id?: string;
}

// Recurring Types
export interface RecurringTransaction {
  id: string;
  name: string;
  icon: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  next_date: string;
  category_id: string;
  category_name: string;
  account_id: string;
  status: 'active' | 'paused';
  reminder_days?: number;
  type?: 'income' | 'expense' | 'bill';
}

export interface RecurringUpcoming {
  upcoming: RecurringTransaction[];
  total_due_30_days: number;
}

export interface RecurringCreate {
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  start_date: string;
  category_id: string;
  account_id: string;
  reminder_days?: number;
}

// Report Types
export interface MonthlyReport {
  summary: {
    total_income: number;
    total_expenses: number;
    net: number;
    savings_rate: number;
  };
  spending_by_category: CategorySpending[];
  income_by_source: IncomeSource[];
  top_merchants: TopMerchant[];
  budget_performance: BudgetPerformance[];
  comparison: {
    income_change_percent: number;
    expense_change_percent: number;
  };
}

export interface CategorySpending {
  category_id: string;
  category_name: string;
  category_color: string;
  amount: number;
  percentage: number;
}

export interface IncomeSource {
  category_id: string;
  category_name: string;
  amount: number;
  percentage: number;
}

export interface TopMerchant {
  merchant_name: string;
  category_name: string;
  transaction_count: number;
  total_amount: number;
}

export interface BudgetPerformance {
  category_name: string;
  budgeted: number;
  actual: number;
  variance: number;
}

export interface NetWorthData {
  data_points: { date: string; net_worth: number }[];
  current_net_worth: number;
  change_percent: number;
}

export interface SpendingTrend {
  date: string;
  categories: Record<string, number>;
}

// Insight Types
export interface Insight {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'success';
  data: Record<string, unknown>;
  created_at: string;
}

// Export Types
export interface Export {
  id: string;
  type: 'transactions_csv' | 'monthly_pdf' | 'tax_summary';
  status: 'processing' | 'ready' | 'failed';
  created_at: string;
  download_url: string | null;
  expires_at: string | null;
  file_size: number | null;
  error?: string;
}

export interface ExportCreate {
  type: 'transactions_csv' | 'monthly_pdf' | 'tax_summary';
  filters?: {
    from?: string;
    to?: string;
    account_ids?: string[];
    category_ids?: string[];
  };
}

// API Response Wrappers
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}
