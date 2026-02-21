/**
 * Error code constants for consistent error handling.
 *
 * @module constants/errors
 *
 * @remarks
 * Use these error codes to handle specific error cases programmatically.
 * Error codes follow the pattern: domain/error-type
 *
 * @example
 * ```typescript
 * import { AUTH_ERROR_CODES } from '@/core/constants/errors';
 *
 * throw {
 *   message: 'Invalid username or password',
 *   code: AUTH_ERROR_CODES.INVALID_CREDENTIALS
 * };
 * ```
 */

/**
 * Authentication error codes.
 */
export const AUTH_ERROR_CODES = {
  /** Invalid username or password */
  INVALID_CREDENTIALS: 'auth/invalid-credentials',
  /** Username or email already exists */
  USER_EXISTS: 'auth/user-exists',
  /** Password does not meet requirements */
  WEAK_PASSWORD: 'auth/weak-password',
  /** User not found */
  USER_NOT_FOUND: 'auth/user-not-found',
  /** Token expired or invalid */
  INVALID_TOKEN: 'auth/invalid-token',
} as const;

/**
 * Game error codes.
 */
export const GAME_ERROR_CODES = {
  /** Invalid guess format or value */
  INVALID_GUESS: 'game/invalid-guess',
  /** Guess is outside allowed range */
  OUT_OF_RANGE: 'game/out-of-range',
  /** Game state error */
  INVALID_STATE: 'game/invalid-state',
} as const;

/**
 * Storage error codes.
 */
export const STORAGE_ERROR_CODES = {
  /** Failed to read from storage */
  READ_ERROR: 'storage/read-error',
  /** Failed to write to storage */
  WRITE_ERROR: 'storage/write-error',
  /** Corrupted data in storage */
  CORRUPTED_DATA: 'storage/corrupted-data',
} as const;

/**
 * Type representing valid auth error codes.
 */
export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];

/**
 * Type representing valid game error codes.
 */
export type GameErrorCode = typeof GAME_ERROR_CODES[keyof typeof GAME_ERROR_CODES];

/**
 * Type representing valid storage error codes.
 */
export type StorageErrorCode = typeof STORAGE_ERROR_CODES[keyof typeof STORAGE_ERROR_CODES];

/**
 * Union type of all error codes.
 */
export type ErrorCode = AuthErrorCode | GameErrorCode | StorageErrorCode;
