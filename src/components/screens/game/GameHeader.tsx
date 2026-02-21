/**
 * Game screen header component.
 *
 * @module components/game/GameHeader
 *
 * @remarks
 * Displays welcome message with language toggle and logout buttons.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '@/components/common/ui';
import { colors, spacing, fontSize, fontWeight } from '@/core/styles/theme';
import type { TestProps } from '@/core/@types/common';

/**
 * Props for GameHeader component.
 */
interface GameHeaderProps extends TestProps {
  /** Username to display in welcome message */
  username: string;
  /** Current language code */
  currentLanguage: string;
  /** Language toggle handler */
  onLanguageToggle: () => void;
  /** Logout handler */
  onLogout: () => void;
  /** Welcome message text */
  welcomeText: string;
  /** Logout button text */
  logoutText: string;
}

/**
 * Game screen header with welcome message and action buttons.
 *
 * @param props - Component props
 * @returns Header component
 */
export const GameHeader: React.FC<GameHeaderProps> = React.memo(
  ({
    username,
    currentLanguage,
    onLanguageToggle,
    onLogout,
    welcomeText,
    logoutText,
    testID,
  }) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.welcomeText} testID={`${testID}-welcome`}>
            {welcomeText}
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <Button
            variant="secondary"
            size="sm"
            onPress={onLanguageToggle}
            testID={`${testID}-language-toggle`}
            accessibilityLabel={`Switch to ${currentLanguage === 'en' ? 'Arabic' : 'English'}`}
            accessibilityRole="button"
          >
            {currentLanguage === 'en' ? 'AR' : 'EN'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            style={styles.logoutButton}
            onPress={onLogout}
            testID={`${testID}-logout`}
            accessibilityLabel="Logout"
            accessibilityRole="button"
          >
            {logoutText}
          </Button>
        </View>
      </MotiView>
    );
  }
);

GameHeader.displayName = 'GameHeader';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  welcomeText: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  logoutButton: {
    marginLeft: spacing.sm,
  },
});
