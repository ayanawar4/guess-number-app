/**
 * Login screen component.
 *
 * @module screens/login
 */

import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { loginSchema, LoginFormData } from '@/core/schema/login-schema';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import { useAsyncError } from '@/core/hooks/ts/common';
import { FormInput, Button } from '@/components/common/ui';
import { AuthLayout } from '@/components/layouts';
import { colors, spacing, fontSize } from '@/core/styles/theme';

/**
 * Login screen component.
 */
export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useAsyncError();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Handles form submission.
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      router.replace('/(app)/game');
    } catch (err: unknown) {
      const error = handleError(err);
      Alert.alert(t('common.error'), error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth.login')}
      subtitle={t('game.title')}
      testID="login-screen"
      footer={
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.noAccount')} </Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => router.push('/(auth)/register')}
            testID="register-link"
          >
            {t('auth.registerNow')}
          </Button>
        </View>
      }
    >
      <FormInput
        control={control}
        name="username"
        label={t('auth.username')}
        placeholder={t('auth.username')}
        error={errors.username?.message}
        autoCapitalize="none"
        testID="username-input"
      />

      <FormInput
        control={control}
        name="password"
        label={t('auth.password')}
        placeholder={t('auth.password')}
        error={errors.password?.message}
        secureTextEntry
        autoCapitalize="none"
        testID="password-input"
      />

      <Button
        variant="primary"
        size="lg"
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        testID="login-button"
        accessibilityLabel="Login"
      >
        {t('auth.login')}
      </Button>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
  },
});

