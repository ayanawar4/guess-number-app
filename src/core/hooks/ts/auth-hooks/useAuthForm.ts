/**
 * Reusable authentication form hook.
 *
 * @module hooks/useAuthForm
 *
 * @remarks
 * This hook encapsulates common form logic for login and register screens,
 * eliminating ~70% code duplication between authentication screens.
 *
 * @example
 * ```typescript
 * const { isLoading, handleSubmit } = useAuthForm(
 *   async (data) => await login(data),
 *   {
 *     onSuccess: () => router.replace('/(app)/game'),
 *     onError: (error) => Alert.alert('Error', error.message)
 *   }
 * );
 * ```
 */

import { useState, useCallback } from 'react';
import type { UseAuthFormOptions } from '@/core/@types/hooks';
import { useAsyncError } from '../common';

/**
 * Reusable authentication form hook.
 *
 * @typeParam T - Form data type (LoginFormData or RegisterFormData)
 * @param onSubmit - Async form submission handler
 * @param options - Configuration options
 * @returns Form state and handlers
 */
export function useAuthForm<T>(
  onSubmit: (data: T) => Promise<void>,
  options?: UseAuthFormOptions
) {
  const [isLoading, setIsLoading] = useState(false);
  const { error, handleError, clearError } = useAsyncError();

  /**
   * Handles form submission with loading and error states.
   *
   * @param data - Form data
   */
  const handleSubmit = useCallback(
    async (data: T) => {
      try {
        setIsLoading(true);
        clearError();
        await onSubmit(data);
        options?.onSuccess?.();
      } catch (err: unknown) {
        const appError = handleError(err);
        options?.onError?.(appError);
      } finally {
        setIsLoading(false);
      }
    },
    [onSubmit, options, handleError, clearError]
  );

  return {
    isLoading,
    error,
    handleSubmit,
    clearError,
  };
}
