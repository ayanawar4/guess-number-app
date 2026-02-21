import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '@/core/@types/auth';
import { storageUtils, StorageKeys } from '@/common/utils/storage';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  initialize: () => {
    const userData = storageUtils.getObject<User>(StorageKeys.USER_DATA);
    const token = storageUtils.getString(StorageKeys.USER_TOKEN);

    if (userData && token) {
      set({ user: userData, isAuthenticated: true });
    }
  },

  login: async (credentials: LoginCredentials) => {
    // Simulate local authentication
    // In a real app, this would hash and compare passwords
    const storedUsers =
      storageUtils.getObject<Record<string, User & { password: string }>>('users') || {};

    const user = Object.values(storedUsers).find((u) => u.username === credentials.username);

    if (user && user.password === credentials.password) {
      const { password: _, ...userWithoutPassword } = user;
      const token = `token_${user.id}_${Date.now()}`;

      storageUtils.setObject(StorageKeys.USER_DATA, userWithoutPassword);
      storageUtils.setString(StorageKeys.USER_TOKEN, token);

      set({ user: userWithoutPassword, isAuthenticated: true });
    } else {
      throw new Error('Invalid username or password');
    }
  },

  register: async (credentials: RegisterCredentials) => {
    // Simulate local registration
    const storedUsers =
      storageUtils.getObject<Record<string, User & { password: string }>>('users') || {};

    // Check if username already exists
    const existingUser = Object.values(storedUsers).find(
      (u) => u.username === credentials.username || u.email === credentials.email
    );

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password, // In production, hash this!
    };

    storedUsers[newUser.id] = newUser;
    storageUtils.setObject('users', storedUsers);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = `token_${newUser.id}_${Date.now()}`;

    storageUtils.setObject(StorageKeys.USER_DATA, userWithoutPassword);
    storageUtils.setString(StorageKeys.USER_TOKEN, token);

    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  logout: () => {
    storageUtils.delete(StorageKeys.USER_DATA);
    storageUtils.delete(StorageKeys.USER_TOKEN);
    set({ user: null, isAuthenticated: false });
  },
}));
