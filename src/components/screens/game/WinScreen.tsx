/**
 * Win screen component.
 *
 * @module components/game/WinScreen
 *
 * @remarks
 * Displays win celebration with play again button.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '@/components/common/ui';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for WinScreen component.
 */
interface WinScreenProps extends TestProps {
  /** Win message to display */
  message: string;
  /** Congratulations text */
  congratsText: string;
  /** Play again button text */
  playAgainText: string;
  /** Play again handler */
  onPlayAgain: () => void;
}

/**
 * Win celebration screen component.
 *
 * @param props - Component props
 * @returns Win screen component
 */
export const WinScreen: React.FC<WinScreenProps> = React.memo(
  ({ message, congratsText, playAgainText, onPlayAgain, testID }) => {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.5, rotate: '-10deg' }}
        animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
        transition={{ type: 'spring', damping: 15 }}
        style={styles.winCard}
      >
        <Text
          style={styles.congratsText}
          testID={`${testID}-congrats`}
          accessibilityRole="header"
        >
          {congratsText}
        </Text>
        <Text style={styles.winMessage} testID={`${testID}-message`}>
          {message}
        </Text>
        <Button
          variant="secondary"
          size="lg"
          style={styles.playAgainButton}
          onPress={onPlayAgain}
          testID={`${testID}-play-again`}
          accessibilityLabel="Play again"
          accessibilityRole="button"
        >
          {playAgainText}
        </Button>
      </MotiView>
    );
  }
);

WinScreen.displayName = 'WinScreen';

const styles = StyleSheet.create({
  winCard: {
    alignItems: 'center',
    backgroundColor: colors.secondary + '15',
    padding: spacing['3xl'],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  congratsText: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.secondary,
    marginBottom: spacing.lg,
  },
  winMessage: {
    fontSize: fontSize.lg,
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  playAgainButton: {
    paddingHorizontal: spacing['3xl'],
  },
});
