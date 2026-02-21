/**
 * Full-screen error display component.
 *
 * @module components/ui/ErrorScreen
 *
 * @remarks
 * Displays an error message with a retry button.
 * Used by ErrorBoundary to show recoverable errors.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { colors, spacing, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for ErrorScreen component.
 */
interface ErrorScreenProps extends TestProps {
  /** Error message to display */
  message?: string;
  /** Retry button handler */
  onRetry?: () => void;
  /** Retry button text */
  retryText?: string;
}

/**
 * Full-screen error display with retry option.
 *
 * @param props - Component props
 * @returns Error screen component
 */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try Again',
  testID = 'error-screen',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message} testID={`${testID}-message`}>
        {message}
      </Text>
      {onRetry && (
        <Button
          variant="primary"
          size="lg"
          onPress={onRetry}
          testID={`${testID}-retry`}
          style={styles.button}
        >
          {retryText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['2xl'],
    backgroundColor: colors.background,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  button: {
    minWidth: 200,
  },
});
