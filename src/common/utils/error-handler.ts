/**
 * Error handling utilities.
 *
 * @module utils/error-handler
 *
 * @remarks
 * Provides utilities for parsing and logging errors in a type-safe manner.
 */

import type { AppError } from '@/core/@types/common';

/**
 * Parses an unknown error into a typed AppError.
 *
 * @param error - Unknown error from catch block
 * @param context - Optional context for logging
 * @returns Typed AppError object
 *
 * @remarks
 * Handles various error types: Error objects, strings, objects with message property, etc.
 *
 * @example
 * ```typescript
 * try {
 *   await someAsyncOperation();
 * } catch (err: unknown) {
 *   const appError = parseError(err, 'someAsyncOperation');
 *   console.error(appError.message);
 * }
 * ```
 */
export const parseError = (error: unknown, context?: string): AppError => {
  // Log error in development
  if (__DEV__ && context) {
    console.error(`[${context}]`, error);
  }

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
 * Logs an error for debugging.
 *
 * @param error - App error to log
 * @param context - Optional context for the error
 *
 * @remarks
 * In production, this could integrate with crash reporting services
 * like Sentry or Firebase Crashlytics.
 *
 * @example
 * ```typescript
 * logError({ message: 'Failed to login', code: 'auth/invalid-credentials' }, 'LoginScreen');
 * ```
 */
export const logError = (error: AppError, context?: string): void => {
  if (__DEV__) {
    const prefix = context ? `[${context}]` : '[Error]';
    console.error(prefix, error.message, error.code ? `(${error.code})` : '');
  }

  // TODO: Integrate with crash reporting service
  // Example: Sentry.captureException(error);
};

/**
 * Creates a user-friendly error message.
 *
 * @param error - App error
 * @returns User-friendly error message
 *
 * @remarks
 * Converts technical error messages to user-friendly ones.
 */
export const getUserFriendlyMessage = (error: AppError): string => {
  // Map common error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    'auth/invalid-credentials': 'Invalid username or password',
    'auth/user-exists': 'This username or email is already registered',
    'auth/weak-password': 'Password is too weak',
    'game/invalid-guess': 'Please enter a valid number',
    'game/out-of-range': 'Number is out of range',
    'storage/read-error': 'Failed to load data',
    'storage/write-error': 'Failed to save data',
  };

  if (error.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  return error.message;
};
