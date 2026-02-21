/**
 * Game statistics component.
 *
 * @module components/game/GameStats
 *
 * @remarks
 * Displays current guess count and best score.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for GameStats component.
 */
interface GameStatsProps extends TestProps {
  /** Current number of guesses */
  guessCount: number;
  /** Best score (lowest guess count) */
  bestScore: number | null;
  /** Label for guess count */
  guessesLabel: string;
  /** Label for best score */
  bestScoreLabel: string;
  /** Text to show when no best score */
  noBestScoreText: string;
}

/**
 * Displays game statistics (guess count and best score).
 *
 * @param props - Component props
 * @returns Stats component
 */
export const GameStats: React.FC<GameStatsProps> = React.memo(
  ({ guessCount, bestScore, guessesLabel, bestScoreLabel, noBestScoreText, testID }) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 300 }}
        style={styles.statsCard}
      >
        <View style={styles.statItem}>
          <Text style={styles.statLabel} testID={`${testID}-guesses-label`}>
            {guessesLabel}
          </Text>
          <Text
            style={styles.statValue}
            testID={`${testID}-guesses-value`}
            accessibilityLabel={`${guessCount} guesses`}
          >
            {guessCount}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel} testID={`${testID}-best-score-label`}>
            {bestScoreLabel}
          </Text>
          <Text
            style={styles.statValuePrimary}
            testID={`${testID}-best-score-value`}
            accessibilityLabel={`Best score: ${bestScore ?? noBestScoreText}`}
          >
            {bestScore ?? noBestScoreText}
          </Text>
        </View>
      </MotiView>
    );
  }
);

GameStats.displayName = 'GameStats';

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing['3xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },
  statValuePrimary: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
});
