/**
 * Reusable button component with variants and sizes.
 *
 * @module components/ui/Button
 *
 * @remarks
 * Provides consistent button styling with support for different variants,
 * sizes, loading states, and accessibility features.
 *
 * @example
 * ```typescript
 * <Button
 *   variant="primary"
 *   size="lg"
 *   onPress={handleSubmit}
 *   isLoading={loading}
 *   testID="submit-button"
 *   accessibilityLabel="Submit form"
 * >
 *   Submit
 * </Button>
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestableAccessibleProps } from '@/core/@types/common';

/**
 * Props for Button component.
 */
export interface ButtonProps extends TouchableOpacityProps, TestableAccessibleProps {
  /** Button text */
  children: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether button is in loading state */
  isLoading?: boolean;
}

/**
 * Button component with variants and sizes.
 *
 * @param props - Component props
 * @returns Button component
 */
export const Button: React.FC<ButtonProps> = React.memo(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  ...props
}) => {
  const buttonStyle: ViewStyle[] = [
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
    (disabled || isLoading) && styles.disabled,
    style as ViewStyle,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    textVariantStyles[variant],
    textSizeStyles[size],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      testID={testID}
      accessibilityLabel={accessibilityLabel || children}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: disabled || isLoading }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'ghost' ? colors.primary : colors.primaryForeground}
          testID={testID ? `${testID}-spinner` : undefined}
        />
      ) : (
        <Text style={textStyle}>{children}</Text>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: fontWeight.semibold,
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  destructive: {
    backgroundColor: colors.destructive,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  md: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
});

const textVariantStyles = StyleSheet.create({
  primary: {
    color: colors.primaryForeground,
  },
  secondary: {
    color: colors.secondaryForeground,
  },
  destructive: {
    color: colors.destructiveForeground,
  },
  ghost: {
    color: colors.primary,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: fontSize.sm,
  },
  md: {
    fontSize: fontSize.base,
  },
  lg: {
    fontSize: fontSize.lg,
  },
});
