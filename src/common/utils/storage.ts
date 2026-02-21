/**
 * MMKV encrypted storage utilities.
 *
 * @module utils/storage
 *
 * @remarks
 * Provides type-safe wrapper around react-native-mmkv for encrypted local storage.
 * All data is encrypted using AES encryption.
 *
 * @example
 * ```typescript
 * import { storageUtils, STORAGE_KEYS } from '@/common/utils/storage';
 *
 * // Store string
 * storageUtils.setString(STORAGE_KEYS.USER_TOKEN, 'abc123');
 *
 * // Store object
 * storageUtils.setObject(STORAGE_KEYS.USER_DATA, { id: '1', username: 'john' });
 *
 * // Retrieve data
 * const token = storageUtils.getString(STORAGE_KEYS.USER_TOKEN);
 * const user = storageUtils.getObject<User>(STORAGE_KEYS.USER_DATA);
 * ```
 */

import { createMMKV } from 'react-native-mmkv';
import { STORAGE_KEYS, type StorageKey } from '@/core/constants/storage-keys';

/**
 * MMKV storage instance with encryption.
 *
 * @remarks
 * All data stored in this instance is encrypted using the provided encryption key.
 */
export const storage = createMMKV({
  id: 'guess-number-storage',
  encryptionKey: 'guess-number-encryption-key-2024',
});

/**
 * Re-export STORAGE_KEYS for convenience.
 */
export { STORAGE_KEYS };

/**
 * Type-safe storage utilities.
 *
 * @remarks
 * Provides methods for storing and retrieving different data types
 * with automatic encryption/decryption.
 */
export const storageUtils = {
  /**
   * Get a string value from storage.
   *
   * @param key - Storage key
   * @returns String value or undefined if not found
   */
  getString: (key: StorageKey | string): string | undefined => {
    return storage.getString(key);
  },

  /**
   * Set a string value in storage.
   *
   * @param key - Storage key
   * @param value - String value to store
   */
  setString: (key: StorageKey | string, value: string): void => {
    storage.set(key, value);
  },

  /**
   * Get a number value from storage.
   *
   * @param key - Storage key
   * @returns Number value or undefined if not found
   */
  getNumber: (key: StorageKey | string): number | undefined => {
    return storage.getNumber(key);
  },

  /**
   * Set a number value in storage.
   *
   * @param key - Storage key
   * @param value - Number value to store
   */
  setNumber: (key: StorageKey | string, value: number): void => {
    storage.set(key, value);
  },

  /**
   * Get a boolean value from storage.
   *
   * @param key - Storage key
   * @returns Boolean value or undefined if not found
   */
  getBoolean: (key: StorageKey | string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  /**
   * Set a boolean value in storage.
   *
   * @param key - Storage key
   * @param value - Boolean value to store
   */
  setBoolean: (key: StorageKey | string, value: boolean): void => {
    storage.set(key, value);
  },

  /**
   * Get an object from storage.
   *
   * @typeParam T - Type of the object to retrieve
   * @param key - Storage key
   * @returns Parsed object or undefined if not found or parsing fails
   *
   * @remarks
   * Objects are stored as JSON strings and automatically parsed on retrieval.
   * Returns undefined if the data is corrupted or invalid JSON.
   */
  getObject: <T>(key: StorageKey | string): T | undefined => {
    const value = storage.getString(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return undefined;
      }
    }
    return undefined;
  },

  /**
   * Set an object in storage.
   *
   * @typeParam T - Type of the object to store
   * @param key - Storage key
   * @param value - Object to store
   *
   * @remarks
   * Objects are automatically serialized to JSON before storage.
   */
  setObject: <T>(key: StorageKey | string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  /**
   * Delete a value from storage.
   *
   * @param key - Storage key
   */
  delete: (key: StorageKey | string): void => {
    storage.remove(key);
  },

  /**
   * Clear all data from storage.
   *
   * @remarks
   * WARNING: This will delete all stored data including user credentials and game progress.
   */
  clearAll: (): void => {
    storage.clearAll();
  },
};
