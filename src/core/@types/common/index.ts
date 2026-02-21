/**
 * Common type definitions shared across the application.
 *
 * @module @types/common
 */

/**
 * Represents an application error with optional metadata.
 *
 * @remarks
 * Use this type instead of throwing raw Error objects or using `any` types.
 * Provides consistent error structure across the application.
 *
 * @example
 * ```typescript
 * const error: AppError = {
 *   message: 'Invalid credentials',
 *   code: 'auth/invalid-credentials',
 *   field: 'password'
 * };
 * ```
 */
export interface AppError {
  /** Human-readable error message */
  message: string;
  /** Optional error code for programmatic error handling */
  code?: string;
  /** Optional field name if error is related to a specific field */
  field?: string;
}

/**
 * Generic type for async operations that can succeed or fail.
 *
 * @typeParam T - The type of data returned on success
 *
 * @remarks
 * Provides a type-safe way to handle async operations without throwing exceptions.
 *
 * @example
 * ```typescript
 * const result: AsyncResult<User> = await loginUser(credentials);
 * if (result.error) {
 *   console.error(result.error.message);
 * } else {
 *   console.log(result.data?.username);
 * }
 * ```
 */
export type AsyncResult<T> = Promise<{ data?: T; error?: AppError }>;

/**
 * Props for components that support test IDs.
 *
 * @remarks
 * Add this to component props to enable E2E and integration testing.
 */
export interface TestProps {
  /** Test identifier for automated testing */
  testID?: string;
}

/**
 * Props for components that support accessibility features.
 *
 * @remarks
 * Add this to component props to ensure accessibility compliance.
 */
export interface AccessibilityProps {
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Additional accessibility hint */
  accessibilityHint?: string;
  /** Role of the element for assistive technologies */
  accessibilityRole?: string;
}

/**
 * Combined props for components that need both test and accessibility support.
 */
export type TestableAccessibleProps = TestProps & AccessibilityProps;
