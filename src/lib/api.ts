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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// Token storage - set from Auth0 React hook via setAccessToken
let accessToken: string | null = null;

/**
 * Set the access token for API requests.
 * This should be called from the Auth0 React provider when the token changes.
 */
export function setAccessToken(token: string | null) {
  accessToken = token;
}

/**
 * Get the current access token
 */
export function getAccessToken(): string | null {
  return accessToken;
}

/**
 * Clear the cached token (e.g., on logout)
 */
export function clearTokenCache() {
  accessToken = null;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string | null
  ): Promise<T> {
    // Use provided token, or fall back to the stored token
    const authToken = token ?? accessToken;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));

      // If unauthorized, clear the token cache
      if (response.status === 401) {
        clearTokenCache();
      }

      throw new Error(error.message || error.detail || `HTTP ${response.status}`);
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  }

  private get<T>(endpoint: string, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, token);
  }

  private post<T>(endpoint: string, data?: unknown, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, token);
  }

  private patch<T>(endpoint: string, data: unknown, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token);
  }

  private put<T>(endpoint: string, data: unknown, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }

  private delete<T>(endpoint: string, token?: string | null): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, token);
  }

  // Auth
  getMe = (token?: string | null) => this.get<User>('/auth/me', token);
  updateProfile = (data: ProfileUpdate, token?: string | null) => this.patch<User>('/auth/profile', data, token);

  // Mono Integration
  getInstitutions = (token?: string | null) => this.get<{ institutions: Institution[] }>('/integrations/mono/institutions', token);
  initMono = (token?: string | null) => this.post<MonoInitResponse>('/integrations/mono/init', {}, token);
  exchangeMonoCode = (code: string, token?: string | null) => this.post<MonoExchangeResponse>('/integrations/mono/exchange', { code }, token);
  reconnectMono = (connectionId: string, token?: string | null) => this.post<MonoInitResponse>(`/integrations/mono/reconnect/${connectionId}`, undefined, token);
  disconnectMono = (connectionId: string, token?: string | null) => this.delete<{ success: boolean }>(`/integrations/mono/${connectionId}`, token);

  // Connections
  getConnections = (token?: string | null) => this.get<{ connections: Connection[] }>('/connections', token);
  getConnection = (id: string, token?: string | null) => this.get<Connection>(`/connections/${id}`, token);
  syncConnection = (id: string, token?: string | null) => this.post<{ job_id: string; status: string }>(`/connections/${id}/sync`, undefined, token);

  // Accounts
  getAccounts = (type?: 'savings' | 'current' | 'credit', token?: string | null) =>
    this.get<{ accounts: Account[] }>(`/accounts${type ? `?type=${type}` : ''}`, token);
  getAccount = (id: string, token?: string | null) => this.get<Account>(`/accounts/${id}`, token);
  createAccount = (data: Partial<Account>, token?: string | null) => this.post<Account>('/accounts', data, token);
  updateAccount = (id: string, data: Partial<Account>, token?: string | null) => this.put<Account>(`/accounts/${id}`, data, token);
  deleteAccount = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/accounts/${id}`, token);

  // Transactions
  getTransactions = (filters?: TransactionFilters, token?: string | null) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    const query = params.toString();
    return this.get<TransactionsResponse>(`/transactions${query ? `?${query}` : ''}`, token);
  };
  getTransaction = (id: string, token?: string | null) => this.get<Transaction>(`/transactions/${id}`, token);
  updateTransaction = (id: string, data: TransactionUpdate, token?: string | null) => this.patch<Transaction>(`/transactions/${id}`, data, token);
  bulkCategorize = (transactionIds: string[], categoryId: string, token?: string | null) =>
    this.post<{ updated_count: number }>('/transactions/bulk-categorize', { transaction_ids: transactionIds, category_id: categoryId }, token);
  createManualTransaction = (data: ManualTransaction, token?: string | null) => this.post<Transaction>('/transactions/manual', data, token);

  // Categories
  getCategories = (token?: string | null) => this.get<{ categories: Category[] }>('/categories', token);
  createCategory = (data: CategoryCreate, token?: string | null) => this.post<Category>('/categories', data, token);
  updateCategory = (id: string, data: Partial<CategoryCreate>, token?: string | null) => this.patch<Category>(`/categories/${id}`, data, token);
  deleteCategory = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/categories/${id}`, token);

  // Category Rules
  getCategoryRules = (token?: string | null) => this.get<{ rules: CategoryRule[] }>('/category-rules', token);
  createCategoryRule = (data: CategoryRuleCreate, token?: string | null) => this.post<CategoryRule>('/category-rules', data, token);
  updateCategoryRule = (id: string, data: Partial<CategoryRuleCreate>, token?: string | null) => this.patch<CategoryRule>(`/category-rules/${id}`, data, token);
  deleteCategoryRule = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/category-rules/${id}`, token);

  // Budgets
  getBudgets = (params?: { period?: string; year?: number; month?: number }, token?: string | null) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.get<{ budgets: Budget[] }>(`/budgets${query ? `?${query}` : ''}`, token);
  };
  getBudget = (id: string, token?: string | null) => this.get<Budget & { transactions: Transaction[] }>(`/budgets/${id}`, token);
  getBudgetProgress = (id: string, token?: string | null) => this.get<BudgetProgress>(`/budgets/${id}/progress`, token);
  createBudget = (data: BudgetCreate, token?: string | null) => this.post<Budget>('/budgets', data, token);
  updateBudget = (id: string, data: Partial<BudgetCreate>, token?: string | null) => this.patch<Budget>(`/budgets/${id}`, data, token);
  deleteBudget = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/budgets/${id}`, token);

  // Goals
  getGoals = (token?: string | null) => this.get<{ goals: Goal[] }>('/goals', token);
  getGoal = (id: string, token?: string | null) => this.get<Goal>(`/goals/${id}`, token);
  createGoal = (data: GoalCreate, token?: string | null) => this.post<Goal>('/goals', data, token);
  updateGoal = (id: string, data: Partial<GoalCreate>, token?: string | null) => this.patch<Goal>(`/goals/${id}`, data, token);
  contributeToGoal = (id: string, amount: number, token?: string | null) => this.post<Goal>(`/goals/${id}/contribute`, { amount }, token);
  deleteGoal = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/goals/${id}`, token);

  // Recurring
  getRecurring = (type?: 'expense' | 'income', token?: string | null) =>
    this.get<{ recurring: RecurringTransaction[] }>(`/recurring${type ? `?type=${type}` : ''}`, token);
  getRecurringUpcoming = (token?: string | null) => this.get<RecurringUpcoming>('/recurring/upcoming', token);
  createRecurring = (data: RecurringCreate, token?: string | null) => this.post<RecurringTransaction>('/recurring', data, token);
  updateRecurring = (id: string, data: Partial<RecurringCreate & { is_active?: boolean }>, token?: string | null) =>
    this.patch<RecurringTransaction>(`/recurring/${id}`, data, token);
  deleteRecurring = (id: string, token?: string | null) => this.delete<{ success: boolean }>(`/recurring/${id}`, token);

  // Reports
  getMonthlyReport = (year: number, month: number, token?: string | null) =>
    this.get<MonthlyReport>(`/reports/monthly?year=${year}&month=${month}`, token);
  getNetWorth = (token?: string | null) =>
    this.get<NetWorthData>(`/reports/net-worth`, token);
  getSpendingTrends = (period: string, categoryIds?: string[], token?: string | null) => {
    const params = new URLSearchParams({ period });
    if (categoryIds?.length) params.append('category_ids', categoryIds.join(','));
    return this.get<{ trends: SpendingTrend[] }>(`/reports/spending-trends?${params}`, token);
  };
  getCashFlow = (period: 'monthly' | 'yearly' = 'monthly', token?: string | null) =>
    this.get<{ cash_flow: { month: string; income: number; expenses: number }[] }>(`/reports/cash-flow?period=${period}`, token);

  // Insights
  getInsights = (token?: string | null) => this.get<{ insights: Insight[] }>('/insights', token);
  dismissInsight = (id: string, token?: string | null) => this.post<{ success: boolean }>(`/insights/${id}/dismiss`, undefined, token);

  // Exports
  getExports = (token?: string | null) => this.get<{ exports: Export[] }>('/exports', token);
  createExport = (data: ExportCreate, token?: string | null) => this.post<{ job_id: string; status: string }>('/exports', data, token);
  getExportStatus = (jobId: string, token?: string | null) => this.get<Export>(`/exports/${jobId}`, token);

  // Health
  healthCheck = () => this.get<{ status: string; version: string; timestamp: string }>('/health');
}

export const api = new ApiClient();
export default api;
