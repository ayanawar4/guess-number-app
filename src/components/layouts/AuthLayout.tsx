/**
 * Shared authentication screen layout.
 *
 * @module components/layouts/AuthLayout
 *
 * @remarks
 * Provides common layout structure for login and register screens,
 * eliminating ~70% code duplication between authentication screens.
 *
 * @example
 * ```typescript
 * <AuthLayout
 *   title={t('auth.login')}
 *   subtitle={t('game.title')}
 *   testID="login-screen"
 * >
 *   <FormInput ... />
 *   <Button ... />
 * </AuthLayout>
 * ```
 */

import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MotiView } from 'moti';
import { colors, spacing, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for AuthLayout component.
 */
interface AuthLayoutProps extends TestProps {
  /** Screen title (e.g., "Login", "Register") */
  title: string;
  /** Screen subtitle (e.g., app name) */
  subtitle: string;
  /** Form content (inputs, buttons) */
  children: React.ReactNode;
  /** Footer content (navigation links) */
  footer?: React.ReactNode;
}

/**
 * Shared layout component for authentication screens.
 *
 * @param props - Component props
 * @returns Authentication screen layout
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer,
  testID,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      testID={testID}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </MotiView>

        {/* Form Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 700, delay: 200 }}
          style={styles.card}
        >
          {children}
        </MotiView>

        {/* Footer */}
        {footer && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 400 }}
            style={styles.footer}
          >
            {footer}
          </MotiView>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    textAlign: 'left',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['2xl'],
  },
});
