import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/core/styles/theme';

interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value'> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  style,
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
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { writingDirection: i18n.language === 'ar' ? 'rtl' : 'ltr'}, style]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''}
            placeholderTextColor="transparent"
            {...textInputProps}
          />
        )}
      />
      {error && <Text style={styles.error}>{translatedError}</Text>}
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
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'left',
  },
});
