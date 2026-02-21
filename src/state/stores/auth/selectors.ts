/**
 * Authentication store selectors.
 *
 * @module stores/auth/selectors
 *
 * @remarks
 * Memoized selectors for accessing auth state.
 * Use these for better performance when subscribing to specific state slices.
 */

import type { AuthState, User } from '@/core/@types/auth';

/**
 * Selects the current user.
 *
 * @param state - Auth state
 * @returns Current user or null
 */
export const selectUser = (state: AuthState): User | null => state.user;

/**
 * Selects authentication status.
 *
 * @param state - Auth state
 * @returns True if user is authenticated
 */
export const selectIsAuthenticated = (state: AuthState): boolean => state.isAuthenticated;

/**
 * Selects the username.
 *
 * @param state - Auth state
 * @returns Username or null
 */
export const selectUsername = (state: AuthState): string | null => state.user?.username || null;

/**
 * Selects the user ID.
 *
 * @param state - Auth state
 * @returns User ID or null
 */
export const selectUserId = (state: AuthState): string | null => state.user?.id || null;
