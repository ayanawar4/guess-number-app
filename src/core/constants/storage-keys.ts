/**
 * Storage key constants for MMKV encrypted storage.
 *
 * @module constants/storage-keys
 *
 * @remarks
 * Use these constants instead of magic strings to ensure type safety
 * and prevent typos when accessing storage.
 *
 * @example
 * ```typescript
 * import { STORAGE_KEYS } from '@/core/constants/storage-keys';
 *
 * storageUtils.setString(STORAGE_KEYS.USER_TOKEN, token);
 * const token = storageUtils.getString(STORAGE_KEYS.USER_TOKEN);
 * ```
 */

/**
 * Storage keys used throughout the application.
 */
export const STORAGE_KEYS = {
  /** Authentication token */
  USER_TOKEN: 'user_token',
  /** User profile data (without password) */
  USER_DATA: 'user_data',
  /** Best score (lowest number of guesses) */
  BEST_SCORE: 'best_score',
  /** Selected app language (en/ar) */
  LOCALE: 'locale',
  /** Local database of all registered users */
  USERS_DB: 'users_db',
} as const;

/**
 * Type representing valid storage keys.
 */
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
