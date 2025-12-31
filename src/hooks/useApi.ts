import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  TransactionFilters,
  TransactionUpdate,
  ManualTransaction,
  CategoryCreate,
  CategoryRuleCreate,
  BudgetCreate,
  GoalCreate,
  RecurringCreate,
  ExportCreate,
  ProfileUpdate,
} from '@/types/api';

// Query Keys
export const queryKeys = {
  user: ['user'] as const,
  connections: ['connections'] as const,
  connection: (id: string) => ['connection', id] as const,
  accounts: (type?: string) => ['accounts', type] as const,
  account: (id: string) => ['account', id] as const,
  transactions: (filters?: TransactionFilters) => ['transactions', filters] as const,
  transaction: (id: string) => ['transaction', id] as const,
  categories: ['categories'] as const,
  categoryRules: ['category-rules'] as const,
  budgets: (params?: { period?: string; year?: number; month?: number }) => ['budgets', params] as const,
  budget: (id: string) => ['budget', id] as const,
  budgetProgress: (id: string) => ['budget-progress', id] as const,
  goals: ['goals'] as const,
  goal: (id: string) => ['goal', id] as const,
  recurring: (type?: string) => ['recurring', type] as const,
  recurringUpcoming: ['recurring-upcoming'] as const,
  monthlyReport: (year: number, month: number) => ['monthly-report', year, month] as const,
  netWorth: (period: string) => ['net-worth', period] as const,
  spendingTrends: (period: string, categoryIds?: string[]) => ['spending-trends', period, categoryIds] as const,
  insights: ['insights'] as const,
  exports: ['exports'] as const,
  institutions: ['institutions'] as const,
};

// User Hooks
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: api.getMe,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProfileUpdate) => api.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

// Connection Hooks
export function useConnections() {
  return useQuery({
    queryKey: queryKeys.connections,
    queryFn: api.getConnections,
  });
}

export function useConnection(id: string) {
  return useQuery({
    queryKey: queryKeys.connection(id),
    queryFn: () => api.getConnection(id),
    enabled: !!id,
  });
}

export function useSyncConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.syncConnection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.connections });
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts() });
    },
  });
}

export function useDisconnectMono() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.disconnectMono(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.connections });
    },
  });
}

// Account Hooks
export function useAccounts(type?: 'savings' | 'current' | 'credit') {
  return useQuery({
    queryKey: queryKeys.accounts(type),
    queryFn: () => api.getAccounts(type),
  });
}

export function useAccount(id: string) {
  return useQuery({
    queryKey: queryKeys.account(id),
    queryFn: () => api.getAccount(id),
    enabled: !!id,
  });
}

// Transaction Hooks
export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions(filters),
    queryFn: () => api.getTransactions(filters),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: queryKeys.transaction(id),
    queryFn: () => api.getTransaction(id),
    enabled: !!id,
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionUpdate }) =>
      api.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useBulkCategorize() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ transactionIds, categoryId }: { transactionIds: string[]; categoryId: string }) =>
      api.bulkCategorize(transactionIds, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useCreateManualTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ManualTransaction) => api.createManualTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts() });
    },
  });
}

// Category Hooks
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: api.getCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryCreate) => api.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryCreate> }) =>
      api.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}

// Category Rule Hooks
export function useCategoryRules() {
  return useQuery({
    queryKey: queryKeys.categoryRules,
    queryFn: api.getCategoryRules,
  });
}

export function useCreateCategoryRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryRuleCreate) => api.createCategoryRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categoryRules });
    },
  });
}

export function useDeleteCategoryRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteCategoryRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categoryRules });
    },
  });
}

// Budget Hooks
export function useBudgets(params?: { period?: string; year?: number; month?: number }) {
  return useQuery({
    queryKey: queryKeys.budgets(params),
    queryFn: () => api.getBudgets(params),
  });
}

export function useBudget(id: string) {
  return useQuery({
    queryKey: queryKeys.budget(id),
    queryFn: () => api.getBudget(id),
    enabled: !!id,
  });
}

export function useBudgetProgress(id: string) {
  return useQuery({
    queryKey: queryKeys.budgetProgress(id),
    queryFn: () => api.getBudgetProgress(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BudgetCreate) => api.createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BudgetCreate> }) =>
      api.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

// Goal Hooks
export function useGoals() {
  return useQuery({
    queryKey: queryKeys.goals,
    queryFn: api.getGoals,
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: queryKeys.goal(id),
    queryFn: () => api.getGoal(id),
    enabled: !!id,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GoalCreate) => api.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.goals });
    },
  });
}

export function useContributeToGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      api.contributeToGoal(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.goals });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.goals });
    },
  });
}

// Recurring Hooks
export function useRecurring(type?: 'expense' | 'income') {
  return useQuery({
    queryKey: queryKeys.recurring(type),
    queryFn: () => api.getRecurring(type),
  });
}

export function useRecurringUpcoming() {
  return useQuery({
    queryKey: queryKeys.recurringUpcoming,
    queryFn: api.getRecurringUpcoming,
  });
}

export function useCreateRecurring() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecurringCreate) => api.createRecurring(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
}

export function useUpdateRecurring() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecurringCreate & { is_active?: boolean }> }) =>
      api.updateRecurring(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
}

export function useDeleteRecurring() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteRecurring(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
}

// Report Hooks
export function useMonthlyReport(year: number, month: number) {
  return useQuery({
    queryKey: queryKeys.monthlyReport(year, month),
    queryFn: () => api.getMonthlyReport(year, month),
  });
}

export function useNetWorth(period: '6months' | '1year' | 'all') {
  return useQuery({
    queryKey: queryKeys.netWorth(period),
    queryFn: () => api.getNetWorth(period),
  });
}

export function useSpendingTrends(period: string, categoryIds?: string[]) {
  return useQuery({
    queryKey: queryKeys.spendingTrends(period, categoryIds),
    queryFn: () => api.getSpendingTrends(period, categoryIds),
  });
}

// Insight Hooks
export function useInsights() {
  return useQuery({
    queryKey: queryKeys.insights,
    queryFn: api.getInsights,
  });
}

export function useDismissInsight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.dismissInsight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.insights });
    },
  });
}

// Export Hooks
export function useExports() {
  return useQuery({
    queryKey: queryKeys.exports,
    queryFn: api.getExports,
  });
}

export function useCreateExport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExportCreate) => api.createExport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.exports });
    },
  });
}

// Institution Hooks
export function useInstitutions() {
  return useQuery({
    queryKey: queryKeys.institutions,
    queryFn: api.getInstitutions,
  });
}
