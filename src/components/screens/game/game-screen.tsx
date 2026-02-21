/**
 * Main game screen component.
 *
 * @module screens/game
 *
 * @remarks
 * Orchestrates game components and handles game logic.
 * Refactored from 412 lines to <150 lines using composition pattern.
 */

import { useEffect, useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import { useGameStore } from '@/state/stores/game/game-store';
import { useGameInput } from '@/core/hooks/ts/game-hooks/useGameInput';
import { useLanguageToggle } from '@/core/hooks/ts/game-hooks/useLanguageToggle';
import { Button } from '@/components/common/ui';
import { GameHeader } from './GameHeader';
import { GameTitle } from './GameTitle';
import { GameStats } from './GameStats';
import { WinScreen } from './WinScreen';
import { GameMessage } from './GameMessage';
import { GameInput } from './GameInput';
import { ConfirmLogoutDialog } from './logout-dialog';
import { colors, spacing } from '@/core/styles/theme';

/**
 * Main game screen component.
 *
 * @returns Game screen
 */
export default function GameScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showLogout, setShowLogout] = useState(false);

  const {
    guessCount,
    bestScore,
    gameStatus,
    message,
    startNewGame,
    makeGuess,
    loadBestScore,
    resetGame,
    clearBestScore,
  } = useGameStore();

  const { currentLanguage, toggleLanguage } = useLanguageToggle();

  // Wrap makeGuess to pass userId
  const handleMakeGuess = useCallback(
    (guess: number) => {
      makeGuess(guess, user?.id);
    },
    [makeGuess, user?.id]
  );

  const { inputValue, handleInputChange, handleSubmit: submitGuess } = useGameInput(handleMakeGuess);

  // Initialize game on mount and load user-specific best score
  useEffect(() => {
    loadBestScore(user?.id);
    startNewGame();
  }, [loadBestScore, startNewGame, user?.id]);

  /**
   * Handles play again action.
   */
  const handlePlayAgain = useCallback(() => {
    resetGame();
    startNewGame();
  }, [resetGame, startNewGame]);

  /**
   * Handles logout action.
   */
  const handleLogout = useCallback(() => {
    setShowLogout(true);
  }, []);

  /**
   * Confirms logout and navigates to login.
   */
  const confirmLogout = useCallback(() => {
    setShowLogout(false);
    logout();
    router.replace('/(auth)/login');
  }, [logout, router]);

  return (
    <SafeAreaView style={styles.container} testID="game-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <GameHeader
            username={user?.username || ''}
            currentLanguage={currentLanguage}
            onLanguageToggle={toggleLanguage}
            onLogout={handleLogout}
            welcomeText={t('common.welcome', { name: user?.username })}
            logoutText={t('auth.logout')}
            testID="game-header"
          />

          {/* Game Title */}
          <GameTitle
            title={t('game.title')}
            subtitle={t('game.subtitle')}
            testID="game-title"
          />

          {/* Stats */}
          <GameStats
            guessCount={guessCount}
            bestScore={bestScore}
            guessesLabel={t('game.guesses')}
            bestScoreLabel={t('game.bestScore')}
            noBestScoreText={t('game.noBestScore')}
            testID="game-stats"
          />

          {/* Game Area */}
          <View style={styles.gameArea}>
            {gameStatus === 'won' ? (
              <WinScreen
                message={message}
                congratsText={t('game.congratulations')}
                playAgainText={t('game.playAgain')}
                onPlayAgain={handlePlayAgain}
                testID="win-screen"
              />
            ) : (
              <>
                <GameMessage message={message} testID="game-message" />
                <GameInput
                  value={inputValue}
                  onChangeText={handleInputChange}
                  onSubmit={submitGuess}
                  label={t('game.yourGuess')}
                  testID="game-input"
                />
                <Button
                  variant="primary"
                  size="lg"
                  style={styles.submitButton}
                  onPress={submitGuess}
                  disabled={!inputValue}
                  testID="submit-guess"
                  accessibilityLabel="Submit guess"
                >
                  {t('game.submit')}
                </Button>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <ConfirmLogoutDialog
        visible={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={confirmLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['3xl'],
  },
  gameArea: {
    flex: 1,
  },
  submitButton: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
