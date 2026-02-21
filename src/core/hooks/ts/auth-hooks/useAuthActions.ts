/**
 * Authentication actions hook.
 *
 * @module hooks/useAuthActions
 *
 * @remarks
 * Provides typed auth actions from the store with navigation handling.
 *
 * @example
 * ```typescript
 * const { handleLogin, handleLogout } = useAuthActions();
 *
 * await handleLogin({ username: 'john', password: 'secret' });
 * ```
 */

import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import type { LoginCredentials, RegisterCredentials } from '@/core/@types/auth';

/**
 * Hook that provides typed auth actions with navigation.
 *
 * @returns Authentication action handlers
 */
export function useAuthActions() {
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  /**
   * Handles user login with navigation.
   *
   * @param credentials - Login credentials
   * @throws {Error} If credentials are invalid
   */
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      await login(credentials);
      router.replace('/(app)/game');
    },
    [login, router]
  );

  /**
   * Handles user registration with navigation.
   *
   * @param credentials - Registration credentials
   * @throws {Error} If username/email already exists
   */
  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      await register(credentials);
      router.replace('/(app)/game');
    },
    [register, router]
  );

  /**
   * Handles user logout with navigation.
   */
  const handleLogout = useCallback(() => {
    logout();
    router.replace('/');
  }, [logout, router]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
}
