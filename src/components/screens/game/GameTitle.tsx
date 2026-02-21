/**
 * Game title component.
 *
 * @module components/game/GameTitle
 *
 * @remarks
 * Displays animated game title and subtitle.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors, spacing, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for GameTitle component.
 */
interface GameTitleProps extends TestProps {
  /** Main title text */
  title: string;
  /** Subtitle text */
  subtitle: string;
}

/**
 * Animated game title section.
 *
 * @param props - Component props
 * @returns Title component
 */
export const GameTitle: React.FC<GameTitleProps> = React.memo(({ title, subtitle, testID }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', delay: 200 }}
      style={styles.titleContainer}
    >
      <Text style={styles.gameTitle} testID={`${testID}-title`}>
        {title}
      </Text>
      <Text style={styles.gameSubtitle} testID={`${testID}-subtitle`}>
        {subtitle}
      </Text>
    </MotiView>
  );
});

GameTitle.displayName = 'GameTitle';

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  gameTitle: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.extrabold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  gameSubtitle: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
});
