/**
 * Form input component integrated with react-hook-form.
 *
 * @module components/ui/FormInput
 *
 * @remarks
 * Provides a controlled input with label, error display, and RTL support.
 * Integrated with react-hook-form for validation and state management.
 *
 * @example
 * ```typescript
 * <FormInput
 *   control={control}
 *   name="email"
 *   label="Email"
 *   error={errors.email?.message}
 *   testID="email-input"
 * />
 * ```
 */

import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for FormInput component.
 *
 * @typeParam T - Form values type from react-hook-form
 */
export interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value'>,
    TestProps {
  /** React-hook-form control object */
  control: Control<T>;
  /** Field name from form schema */
  name: Path<T>;
  /** Input label */
  label: string;
  /** Validation error message */
  error?: string;
}

/**
 * Form input component with label and error display.
 *
 * @typeParam T - Form values type
 * @param props - Component props
 * @returns Form input component
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  style,
  testID,
  ...textInputProps
}: FormInputProps<T>) {
  const { t, i18n } = useTranslation();

  // Translate error if it's a translation key
  // If translation doesn't exist, fall back to 'required' for better UX
  const translatedError = error
    ? t(`validation.${error}`, t('validation.required'))
    : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.label} testID={testID ? `${testID}-label` : undefined}>
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { writingDirection: i18n.language === 'ar' ? 'rtl' : 'ltr' },
              error && styles.inputError,
              style,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''}
            placeholderTextColor="transparent"
            testID={testID}
            accessibilityLabel={label}
            accessibilityHint={error ? translatedError : undefined}
            accessibilityInvalid={!!error}
            {...textInputProps}
          />
        )}
      />
      {error && (
        <Text
          style={styles.error}
          testID={testID ? `${testID}-error` : undefined}
          accessibilityRole="alert"
        >
          {translatedError}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.sm,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.input,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  inputError: {
    borderColor: colors.destructive,
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'left',
  },
});
