import { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { loginSchema, LoginFormData } from '@/core/schema/login-schema';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import { FormInput, Button } from '@/components/common/ui';
import { colors, spacing, fontSize, fontWeight } from '@/core/styles/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      router.replace('/(app)/game');
    } catch (error: any) {
      Alert.alert(t('common.error'), error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <Text style={styles.title}>{t('auth.login')}</Text>
          <Text style={styles.subtitle}>{t('game.title')}</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 700, delay: 200 }}
          style={styles.card}
        >
          <FormInput
            control={control}
            name="username"
            label={t('auth.username')}
            placeholder={t('auth.username')}
            error={errors.username?.message}
            autoCapitalize="none"
          />

          <FormInput
            control={control}
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.password')}
            error={errors.password?.message}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            variant="primary"
            size="lg"
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            {t('auth.login')}
          </Button>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
          style={styles.footer}
        >
          <Text style={styles.footerText}>{t('auth.noAccount')} </Text>
          <Button variant="ghost" size="sm" onPress={() => router.push('/(auth)/register')}>
            {t('auth.registerNow')}
          </Button>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent:'flex-start'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing['3xl'],
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.extrabold,
    color: colors.primary,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.mutedForeground,
    textAlign:'left'
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing['2xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border + '80',
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['2xl'],
  },
  footerText: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
  },
});

