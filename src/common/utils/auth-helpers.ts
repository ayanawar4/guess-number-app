/**
 * Authentication helper functions.
 *
 * @module utils/auth-helpers
 *
 * @remarks
 * Business logic helpers for authentication operations.
 */

import type { User, StoredUser, LoginCredentials, UsersDatabase } from '@/core/@types/auth';
import { AUTH_ERROR_CODES } from '@/core/constants/errors';

/**
 * Validates user credentials against stored users.
 *
 * @param credentials - Login credentials
 * @param storedUsers - Database of registered users
 * @returns User object without password
 * @throws {Error} If credentials are invalid
 *
 * @remarks
 * In production, this should use proper password hashing comparison (bcrypt, argon2).
 */
export const validateCredentials = (
  credentials: LoginCredentials,
  storedUsers: UsersDatabase
): User => {
  const user = Object.values(storedUsers).find((u) => u.username === credentials.username);

  if (!user) {
    throw new Error('Invalid username or password');
  }

  // WARNING: Plain text comparison - use proper hashing in production
  if (user.password !== credentials.password) {
    throw new Error('Invalid username or password');
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Checks if username or email already exists.
 *
 * @param username - Username to check
 * @param email - Email to check
 * @param storedUsers - Database of registered users
 * @returns True if user exists, false otherwise
 */
export const checkUserExists = (
  username: string,
  email: string,
  storedUsers: UsersDatabase
): boolean => {
  return Object.values(storedUsers).some(
    (u) => u.username === username || u.email === email
  );
};

/**
 * Creates a new user object.
 *
 * @param username - Username
 * @param email - Email
 * @param password - Password (will be stored in plain text - DEMO ONLY)
 * @returns New stored user object
 *
 * @remarks
 * WARNING: Stores password in plain text for demo purposes.
 * In production, hash the password before storing.
 */
export const createUser = (username: string, email: string, password: string): StoredUser => {
  return {
    id: `user_${Date.now()}`,
    username,
    email,
    password, // In production, hash this!
  };
};

/**
 * Generates an authentication token.
 *
 * @param userId - User ID
 * @returns Authentication token
 *
 * @remarks
 * In production, use proper JWT or session tokens.
 */
export const generateAuthToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};

/**
 * Removes password from user object.
 *
 * @param user - User with password
 * @returns User without password
 */
export const sanitizeUser = (user: StoredUser): User => {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
