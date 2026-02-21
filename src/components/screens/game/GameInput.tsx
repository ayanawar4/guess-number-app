/**
 * Game input component.
 *
 * @module components/game/GameInput
 *
 * @remarks
 * Input field for entering guesses.
 */

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for GameInput component.
 */
interface GameInputProps extends TestProps {
  /** Input value */
  value: string;
  /** Input change handler */
  onChangeText: (text: string) => void;
  /** Submit handler */
  onSubmit: () => void;
  /** Input label text */
  label: string;
  /** Input placeholder */
  placeholder?: string;
}

/**
 * Game input field component.
 *
 * @param props - Component props
 * @returns Input component
 */
export const GameInput: React.FC<GameInputProps> = React.memo(
  ({ value, onChangeText, onSubmit, label, placeholder = '1-43', testID }) => {
    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 400 }}
        style={styles.inputContainer}
      >
        <Text style={styles.inputLabel} testID={`${testID}-label`}>
          {label}
        </Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          maxLength={2}
          onSubmitEditing={onSubmit}
          testID={testID}
          accessibilityLabel="Enter your guess"
          accessibilityRole="none"
        />
      </MotiView>
    );
  }
);

GameInput.displayName = 'GameInput';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.sm,
    textAlign: 'left',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: fontSize.xl,
    color: colors.foreground,
    textAlign: 'center',
    fontWeight: fontWeight.semibold,
  },
});
