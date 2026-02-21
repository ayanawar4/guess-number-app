import { Redirect } from 'expo-router';
import { useAuthStore } from '@/state/stores/auth/auth-store';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(app)/game" />;
  }

  return <Redirect href="/(auth)/login" />;
}
