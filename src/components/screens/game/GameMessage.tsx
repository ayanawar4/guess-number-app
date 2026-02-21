/**
 * Game message component.
 *
 * @module components/game/GameMessage
 *
 * @remarks
 * Displays feedback message (too high/low).
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for GameMessage component.
 */
interface GameMessageProps extends TestProps {
  /** Message to display */
  message?: string;
}

/**
 * Displays game feedback message.
 *
 * @param props - Component props
 * @returns Message component or null
 */
export const GameMessage: React.FC<GameMessageProps> = React.memo(({ message, testID }) => {
  if (!message) {
    return null;
  }

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring' }}
      key={message}
      style={styles.messageCard}
    >
      <Text
        style={styles.messageText}
        testID={testID}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
      >
        {message}
      </Text>
    </MotiView>
  );
});

GameMessage.displayName = 'GameMessage';

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: colors.muted,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  messageText: {
    fontSize: fontSize.base,
    color: colors.foreground,
    textAlign: 'center',
    fontWeight: fontWeight.medium,
  },
});
