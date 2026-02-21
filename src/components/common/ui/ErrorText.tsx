/**
 * Error text component with consistent styling.
 *
 * @module components/ui/ErrorText
 *
 * @remarks
 * Provides a consistent way to display error messages throughout the app.
 *
 * @example
 * ```typescript
 * <ErrorText error="Invalid email address" testID="email-error" />
 * ```
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for ErrorText component.
 */
interface ErrorTextProps extends TestProps {
  /** Error message to display */
  error?: string | null;
}

/**
 * Displays an error message with consistent styling.
 *
 * @param props - Component props
 * @returns Error text component or null if no error
 */
export const ErrorText: React.FC<ErrorTextProps> = ({ error, testID }) => {
  if (!error) {
    return null;
  }

  return (
    <Text style={styles.error} testID={testID} accessibilityRole="alert">
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});
