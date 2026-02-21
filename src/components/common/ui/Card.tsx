/**
 * Reusable card container component.
 *
 * @module components/ui/Card
 *
 * @remarks
 * Provides a consistent card UI with shadow and border styling.
 *
 * @example
 * ```typescript
 * <Card elevated>
 *   <Text>Card content</Text>
 * </Card>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for Card component.
 */
interface CardProps extends TestProps {
  /** Card content */
  children: React.ReactNode;
  /** Whether to show elevated shadow */
  elevated?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Card container component with consistent styling.
 *
 * @param props - Component props
 * @returns Card component
 */
export const Card: React.FC<CardProps> = ({ children, elevated = true, style, testID }) => {
  return (
    <View
      style={[styles.card, elevated && styles.elevated, style]}
      testID={testID}
      accessibilityRole="none"
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border + '80',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
