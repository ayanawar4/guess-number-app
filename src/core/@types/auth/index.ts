/**
 * Authentication type definitions.
 *
 * @module @types/auth
 */

import type { AppError } from '../common';

/**
 * User profile data (without password).
 *
 * @remarks
 * This is the public user object stored in state and returned from auth operations.
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** Username for login */
  username: string;
  /** User email address */
  email: string;
}

/**
 * User data with password (used for local storage only).
 *
 * @remarks
 * SECURITY WARNING: This is for demo purposes only.
 * In production, never store passwords in plain text.
 * Use proper hashing (bcrypt, argon2, etc.).
 */
export interface StoredUser extends User {
  /** Plain text password (DEMO ONLY - use hashing in production) */
  password: string;
}

/**
 * Login credentials.
 */
export interface LoginCredentials {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/**
 * Registration credentials.
 */
export interface RegisterCredentials {
  /** Username */
  username: string;
  /** Email address */
  email: string;
  /** Password */
  password: string;
  /** Password confirmation */
  confirmPassword: string;
}

/**
 * Authentication error with specific error code.
 */
export interface AuthError extends AppError {
  /** Auth-specific error code */
  code: string;
}

/**
 * Result of authentication operations.
 *
 * @typeParam T - Type of data returned (User, boolean, etc.)
 */
export type AuthResult<T = User> = {
  /** Success data */
  data?: T;
  /** Error if operation failed */
  error?: AuthError;
};

/**
 * Authentication store state and actions.
 */
export interface AuthState {
  /** Currently authenticated user */
  user: User | null;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Login action */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** Registration action */
  register: (credentials: RegisterCredentials) => Promise<void>;
  /** Logout action */
  logout: () => void;
  /** Initialize auth state from storage */
  initialize: () => void;
}

/**
 * Local user database (maps user ID to user data with password).
 */
export type UsersDatabase = Record<string, StoredUser>;
