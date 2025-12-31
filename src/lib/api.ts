import type {
  User,
  ProfileUpdate,
  Connection,
  Institution,
  MonoInitResponse,
  MonoExchangeResponse,
  Account,
  Transaction,
  TransactionFilters,
  TransactionsResponse,
  TransactionUpdate,
  ManualTransaction,
  Category,
  CategoryCreate,
  CategoryRule,
  CategoryRuleCreate,
  Budget,
  BudgetProgress,
  BudgetCreate,
  Goal,
  GoalCreate,
  RecurringTransaction,
  RecurringUpcoming,
  RecurringCreate,
  MonthlyReport,
  NetWorthData,
  SpendingTrend,
  Insight,
  Export,
  ExportCreate,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.personal-finance.namelesscompany.cc/api/v1';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  private get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  private post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  private delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Auth
  getMe = () => this.get<User>('/auth/me');
  updateProfile = (data: ProfileUpdate) => this.patch<User>('/auth/profile', data);

  // Mono Integration
  getInstitutions = () => this.get<{ institutions: Institution[] }>('/integrations/mono/institutions');
  initMono = () => this.post<MonoInitResponse>('/integrations/mono/init', {});
  exchangeMonoCode = (code: string) => this.post<MonoExchangeResponse>('/integrations/mono/exchange', { code });
  reconnectMono = (connectionId: string) => this.post<MonoInitResponse>(`/integrations/mono/reconnect/${connectionId}`);
  disconnectMono = (connectionId: string) => this.delete<{ success: boolean }>(`/integrations/mono/${connectionId}`);

  // Connections
  getConnections = () => this.get<{ connections: Connection[] }>('/connections');
  getConnection = (id: string) => this.get<Connection>(`/connections/${id}`);
  syncConnection = (id: string) => this.post<{ job_id: string; status: string }>(`/connections/${id}/sync`);

  // Accounts
  getAccounts = (type?: 'savings' | 'current' | 'credit') => 
    this.get<{ accounts: Account[] }>(`/accounts${type ? `?type=${type}` : ''}`);
  getAccount = (id: string) => this.get<Account>(`/accounts/${id}`);

  // Transactions
  getTransactions = (filters?: TransactionFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.get<TransactionsResponse>(`/transactions?${params}`);
  };
  getTransaction = (id: string) => this.get<Transaction>(`/transactions/${id}`);
  updateTransaction = (id: string, data: TransactionUpdate) => this.patch<Transaction>(`/transactions/${id}`, data);
  bulkCategorize = (transactionIds: string[], categoryId: string) => 
    this.post<{ updated_count: number }>('/transactions/bulk-categorize', { transaction_ids: transactionIds, category_id: categoryId });
  createManualTransaction = (data: ManualTransaction) => this.post<Transaction>('/transactions/manual', data);

  // Categories
  getCategories = () => this.get<{ categories: Category[] }>('/categories');
  createCategory = (data: CategoryCreate) => this.post<Category>('/categories', data);
  updateCategory = (id: string, data: Partial<CategoryCreate>) => this.patch<Category>(`/categories/${id}`, data);
  deleteCategory = (id: string) => this.delete<{ success: boolean }>(`/categories/${id}`);

  // Category Rules
  getCategoryRules = () => this.get<{ rules: CategoryRule[] }>('/category-rules');
  createCategoryRule = (data: CategoryRuleCreate) => this.post<CategoryRule>('/category-rules', data);
  updateCategoryRule = (id: string, data: Partial<CategoryRuleCreate>) => this.patch<CategoryRule>(`/category-rules/${id}`, data);
  deleteCategoryRule = (id: string) => this.delete<{ success: boolean }>(`/category-rules/${id}`);

  // Budgets
  getBudgets = (params?: { period?: string; year?: number; month?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.get<{ budgets: Budget[] }>(`/budgets?${searchParams}`);
  };
  getBudget = (id: string) => this.get<Budget & { transactions: Transaction[] }>(`/budgets/${id}`);
  getBudgetProgress = (id: string) => this.get<BudgetProgress>(`/budgets/${id}/progress`);
  createBudget = (data: BudgetCreate) => this.post<Budget>('/budgets', data);
  updateBudget = (id: string, data: Partial<BudgetCreate>) => this.patch<Budget>(`/budgets/${id}`, data);
  deleteBudget = (id: string) => this.delete<{ success: boolean }>(`/budgets/${id}`);

  // Goals
  getGoals = () => this.get<{ goals: Goal[] }>('/goals');
  getGoal = (id: string) => this.get<Goal>(`/goals/${id}`);
  createGoal = (data: GoalCreate) => this.post<Goal>('/goals', data);
  updateGoal = (id: string, data: Partial<GoalCreate>) => this.patch<Goal>(`/goals/${id}`, data);
  contributeToGoal = (id: string, amount: number) => this.post<Goal>(`/goals/${id}/contribute`, { amount });
  deleteGoal = (id: string) => this.delete<{ success: boolean }>(`/goals/${id}`);

  // Recurring
  getRecurring = (type?: 'expense' | 'income') => 
    this.get<{ recurring: RecurringTransaction[] }>(`/recurring${type ? `?type=${type}` : ''}`);
  getRecurringUpcoming = () => this.get<RecurringUpcoming>('/recurring/upcoming');
  createRecurring = (data: RecurringCreate) => this.post<RecurringTransaction>('/recurring', data);
  updateRecurring = (id: string, data: Partial<RecurringCreate & { is_active?: boolean }>) => 
    this.patch<RecurringTransaction>(`/recurring/${id}`, data);
  deleteRecurring = (id: string) => this.delete<{ success: boolean }>(`/recurring/${id}`);

  // Reports
  getMonthlyReport = (year: number, month: number) => 
    this.get<MonthlyReport>(`/reports/monthly?year=${year}&month=${month}`);
  getNetWorth = (period: '6months' | '1year' | 'all') => 
    this.get<NetWorthData>(`/reports/net-worth?period=${period}`);
  getSpendingTrends = (period: string, categoryIds?: string[]) => {
    const params = new URLSearchParams({ period });
    if (categoryIds?.length) params.append('category_ids', categoryIds.join(','));
    return this.get<{ trends: SpendingTrend[] }>(`/reports/spending-trends?${params}`);
  };

  // Insights
  getInsights = () => this.get<{ insights: Insight[] }>('/insights');
  dismissInsight = (id: string) => this.post<{ success: boolean }>(`/insights/${id}/dismiss`);

  // Exports
  getExports = () => this.get<{ exports: Export[] }>('/exports');
  createExport = (data: ExportCreate) => this.post<{ job_id: string; status: string }>('/exports', data);
  getExportStatus = (jobId: string) => this.get<Export>(`/exports/${jobId}`);

  // Health
  healthCheck = () => this.get<{ status: string; version: string; timestamp: string }>('/health');
}

export const api = new ApiClient();
export default api;
