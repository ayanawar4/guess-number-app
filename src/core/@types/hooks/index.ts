/**
 * Type definitions for custom hooks.
 *
 * @module @types/hooks
 */

import type { AppError } from '../common';

/**
 * Options for the useAuthForm hook.
 *
 * @remarks
 * Configure behavior and callbacks for authentication form handling.
 */
export interface UseAuthFormOptions {
  /** Callback invoked on successful form submission */
  onSuccess?: () => void;
  /** Callback invoked when form submission fails */
  onError?: (error: AppError) => void;
}

/**
 * Options for the useGame hook.
 *
 * @remarks
 * Configure game initialization and behavior.
 */
export interface UseGameOptions {
  /** Whether to automatically load best score on mount */
  autoLoad?: boolean;
}

/**
 * Return type for async error handling hook.
 */
export interface UseAsyncErrorReturn {
  /** Current error state */
  error: AppError | null;
  /** Handler to process unknown errors into AppError */
  handleError: (error: unknown) => AppError;
  /** Clear the current error */
  clearError: () => void;
}
