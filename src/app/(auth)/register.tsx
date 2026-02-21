/**
 * Registration screen component.
 *
 * @module screens/register
 */

import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { registerSchema, RegisterFormData } from '@/core/schema/register-schema';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import { useAsyncError } from '@/core/hooks/ts/common';
import { FormInput, Button } from '@/components/common/ui';
import { AuthLayout } from '@/components/layouts';
import { colors, spacing, fontSize } from '@/core/styles/theme';

/**
 * Registration screen component.
 */
export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const register = useAuthStore((state) => state.register);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useAsyncError();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * Handles form submission.
   */
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await register(data);
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
      title={t('auth.register')}
      subtitle={t('game.title')}
      testID="register-screen"
      footer={
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.hasAccount')} </Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => router.back()}
            testID="login-link"
          >
            {t('auth.loginNow')}
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
        name="email"
        label={t('auth.email')}
        placeholder={t('auth.email')}
        error={errors.email?.message}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
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

      <FormInput
        control={control}
        name="confirmPassword"
        label={t('auth.confirmPassword')}
        placeholder={t('auth.confirmPassword')}
        error={errors.confirmPassword?.message}
        secureTextEntry
        autoCapitalize="none"
        testID="confirm-password-input"
      />

      <Button
        variant="primary"
        size="lg"
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        testID="register-button"
        accessibilityLabel="Register"
      >
        {t('auth.register')}
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

