/**
 * Authentication store.
 *
 * @module stores/auth
 *
 * @remarks
 * Manages user authentication state including login, registration, and logout.
 * Uses MMKV for encrypted local storage of user data.
 *
 * WARNING: Passwords are stored in plain text for demo purposes only.
 * In production, use proper password hashing (bcrypt, argon2, etc.).
 */

import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterCredentials, User, UsersDatabase } from '@/core/@types/auth';
import { storageUtils, STORAGE_KEYS } from '@/common/utils/storage';
import {
  validateCredentials,
  checkUserExists,
  createUser,
  generateAuthToken,
  sanitizeUser,
} from '@/common/utils/auth-helpers';

/**
 * Authentication store hook.
 *
 * @returns Auth state and actions
 *
 * @example
 * ```typescript
 * const { user, login, logout } = useAuthStore();
 *
 * await login({ username: 'john', password: 'secret' });
 * console.log(user?.username); // 'john'
 * ```
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  /**
   * Initializes auth state from storage.
   *
   * @remarks
   * Called on app start to restore user session.
   */
  initialize: () => {
    const userData = storageUtils.getObject<User>(STORAGE_KEYS.USER_DATA);
    const token = storageUtils.getString(STORAGE_KEYS.USER_TOKEN);

    if (userData && token) {
      set({ user: userData, isAuthenticated: true });
    }
  },

  /**
   * Logs in a user with credentials.
   *
   * @param credentials - Login credentials
   * @throws {Error} If credentials are invalid
   *
   * @remarks
   * Validates credentials, generates token, and stores user data.
   */
  login: async (credentials: LoginCredentials) => {
    const storedUsers = storageUtils.getObject<UsersDatabase>(STORAGE_KEYS.USERS_DB) || {};

    // Validate credentials using helper
    const user = validateCredentials(credentials, storedUsers);
    const token = generateAuthToken(user.id);

    // Store user data and token
    storageUtils.setObject(STORAGE_KEYS.USER_DATA, user);
    storageUtils.setString(STORAGE_KEYS.USER_TOKEN, token);

    set({ user, isAuthenticated: true });
  },

  /**
   * Registers a new user.
   *
   * @param credentials - Registration credentials
   * @throws {Error} If username or email already exists
   *
   * @remarks
   * Creates new user, stores in database, and logs them in.
   */
  register: async (credentials: RegisterCredentials) => {
    const storedUsers = storageUtils.getObject<UsersDatabase>(STORAGE_KEYS.USERS_DB) || {};

    // Check if user already exists
    if (checkUserExists(credentials.username, credentials.email, storedUsers)) {
      throw new Error('Username or email already exists');
    }

    // Create new user
    const newUser = createUser(credentials.username, credentials.email, credentials.password);

    // Store in database
    storedUsers[newUser.id] = newUser;
    storageUtils.setObject(STORAGE_KEYS.USERS_DB, storedUsers);

    // Sanitize and store user data
    const user = sanitizeUser(newUser);
    const token = generateAuthToken(newUser.id);

    storageUtils.setObject(STORAGE_KEYS.USER_DATA, user);
    storageUtils.setString(STORAGE_KEYS.USER_TOKEN, token);

    set({ user, isAuthenticated: true });
  },

  /**
   * Logs out the current user.
   *
   * @remarks
   * Clears user data and token from storage.
   */
  logout: () => {
    storageUtils.delete(STORAGE_KEYS.USER_DATA);
    storageUtils.delete(STORAGE_KEYS.USER_TOKEN);
    set({ user: null, isAuthenticated: false });
  },
}));
