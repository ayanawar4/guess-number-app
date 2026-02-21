/**
 * Custom hook for handling async errors with proper typing.
 *
 * @module hooks/useAsyncError
 *
 * @remarks
 * This hook provides type-safe error handling for async operations,
 * eliminating the need for `any` types in catch blocks.
 *
 * @example
 * ```typescript
 * const { error, handleError, clearError } = useAsyncError();
 *
 * try {
 *   await someAsyncOperation();
 * } catch (err: unknown) {
 *   const appError = handleError(err);
 *   Alert.alert('Error', appError.message);
 * }
 * ```
 */

import { useState, useCallback } from 'react';
import type { AppError } from '@/core/@types/common';
import type { UseAsyncErrorReturn } from '@/core/@types/hooks';

/**
 * Parses an unknown error into a typed AppError.
 *
 * @param error - Unknown error from catch block
 * @returns Typed AppError object
 *
 * @remarks
 * Handles various error types: Error objects, strings, objects with message property, etc.
 */
const parseError = (error: unknown): AppError => {
  // Error instance
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as Error & { code?: string }).code,
    };
  }

  // String error
  if (typeof error === 'string') {
    return { message: error };
  }

  // Object with message property
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: String(error.message),
      code: 'code' in error ? String(error.code) : undefined,
      field: 'field' in error ? String(error.field) : undefined,
    };
  }

  // Unknown error type
  return { message: 'An unexpected error occurred' };
};

/**
 * Hook for handling async errors with proper typing.
 *
 * @returns Object containing error state and handlers
 *
 * @remarks
 * Use this hook to replace `catch (error: any)` blocks with type-safe error handling.
 */
export const useAsyncError = (): UseAsyncErrorReturn => {
  const [error, setError] = useState<AppError | null>(null);

  /**
   * Handles an unknown error and converts it to AppError.
   *
   * @param err - Unknown error from catch block
   * @returns Typed AppError
   */
  const handleError = useCallback((err: unknown): AppError => {
    const appError = parseError(err);
    setError(appError);
    return appError;
  }, []);

  /**
   * Clears the current error state.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};
