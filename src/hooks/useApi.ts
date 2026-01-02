'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Account,
  Transaction,
  TransactionFilters,
  TransactionsResponse,
  Budget,
  Insight,
  NetWorthData,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Hook to create an authenticated fetch function
 */
export function useAuthenticatedFetch() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const authFetch = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    let token: string | null = null;
    
    if (isAuthenticated) {
      try {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          },
        });
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || error.detail || `HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  }, [getAccessTokenSilently, isAuthenticated]);

  return authFetch;
}

/**
 * Hook for fetching accounts
 */
export function useAccounts(type?: 'savings' | 'current' | 'credit') {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['accounts', type],
    queryFn: () => authFetch<{ accounts: Account[] }>(`/accounts${type ? `?type=${type}` : ''}`),
  });
}

/**
 * Hook for fetching transactions
 */
export function useTransactions(filters?: TransactionFilters) {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) params.append(key, String(value));
        });
      }
      const query = params.toString();
      return authFetch<TransactionsResponse>(`/transactions${query ? `?${query}` : ''}`);
    },
  });
}

/**
 * Hook for fetching budgets
 */
export function useBudgets(params?: { period?: string; year?: number; month?: number }) {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['budgets', params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) searchParams.append(key, String(value));
        });
      }
      const query = searchParams.toString();
      return authFetch<{ budgets: Budget[] }>(`/budgets${query ? `?${query}` : ''}`);
    },
  });
}

/**
 * Hook for fetching insights
 */
export function useInsights() {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['insights'],
    queryFn: () => authFetch<{ insights: Insight[] }>('/insights'),
  });
}

/**
 * Hook for fetching net worth
 */
export function useNetWorth(period: '6months' | '1year' | 'all') {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['netWorth', period],
    queryFn: () => authFetch<NetWorthData>(`/reports/net-worth?period=${period}`),
  });
}

/**
 * Hook for fetching cash flow
 */
export function useCashFlow() {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['cashFlow'],
    queryFn: () => authFetch<{ cash_flow: { month: string; income: number; expenses: number }[] }>('/reports/cash-flow'),
  });
}

/**
 * Hook for syncing a connection
 */
export function useSyncConnection() {
  const authFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (connectionId: string) => 
      authFetch<{ job_id: string; status: string }>(`/connections/${connectionId}/sync`, {
        method: 'POST',
      }),
    onSuccess: () => {
      // Invalidate accounts and transactions queries to refetch after sync
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

/**
 * Hook for fetching categories
 */
export function useCategories() {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => authFetch<{ categories: unknown[] }>('/categories'),
  });
}

/**
 * Hook for fetching goals
 */
export function useGoals() {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => authFetch<{ goals: unknown[] }>('/goals'),
  });
}

/**
 * Hook for fetching recurring transactions
 */
export function useRecurring(type?: 'expense' | 'income') {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['recurring', type],
    queryFn: () => authFetch<{ recurring: unknown[] }>(`/recurring${type ? `?type=${type}` : ''}`),
  });
}

/**
 * Hook for fetching monthly report
 */
export function useMonthlyReport(year: number, month: number) {
  const authFetch = useAuthenticatedFetch();
  
  return useQuery({
    queryKey: ['monthlyReport', year, month],
    queryFn: () => authFetch<unknown>(`/reports/monthly?year=${year}&month=${month}`),
  });
}

/**
 * Hook for health check
 */
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => fetch(`${API_BASE_URL}/health`).then(res => res.json()),
  });
}

// Export default for backwards compatibility
export default {
  useAccounts,
  useTransactions,
  useBudgets,
  useInsights,
  useNetWorth,
  useCashFlow,
  useSyncConnection,
  useCategories,
  useGoals,
  useRecurring,
  useMonthlyReport,
  useHealthCheck,
};
