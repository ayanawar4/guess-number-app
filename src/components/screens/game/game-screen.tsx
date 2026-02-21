import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  I18nManager,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import RNRestart from 'react-native-restart';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/state/stores/auth/auth-store';
import { useGameStore } from '@/state/stores/game/game-store';
import { Button } from '@/components/common/ui';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/core/styles/theme';
import { storageUtils, StorageKeys } from '@/common/utils/storage';
import { ConfirmLogoutDialog } from '@/components/screens/game/logout-dialog';

export default function GameScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };
  const {
    guessCount,
    bestScore,
    gameStatus,
    message,
    startNewGame,
    makeGuess,
    loadBestScore,
    resetGame,
  } = useGameStore();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    loadBestScore();
    startNewGame();
  }, []);

  const handleGuess = () => {
    const guess = parseInt(inputValue, 10);

    if (isNaN(guess)) {
      Alert.alert(t('common.error'), 'Please enter a valid number');
      return;
    }

    if (guess < 1 || guess > 43) {
      Alert.alert(t('common.error'), t('validation.numberBetween', { min: 1, max: 43 }));
      return;
    }

    makeGuess(guess);
    setInputValue('');
  };

  const handlePlayAgain = () => {
    resetGame();
    startNewGame();
    setInputValue('');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';

    // Save language preference to storage
    storageUtils.setString(StorageKeys.LOCALE, newLang);

    // Change language and force RTL if needed
    i18n.changeLanguage(newLang);
    I18nManager.allowRTL(newLang === 'ar');
    I18nManager.forceRTL(newLang === 'ar');

    // Restart app to apply RTL changes
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.header}
          >
            <View>
              <Text style={styles.welcomeText}>
                {t('common.welcome', { name: user?.username })}
              </Text>
            </View>
            <View style={styles.headerButtons}>
              <Button variant="secondary" size="sm" onPress={toggleLanguage}>
                {i18n.language === 'en' ? 'AR' : 'EN'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                {t('auth.logout')}
              </Button>
            </View>
          </MotiView>

          {/* Game Title */}
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200 }}
            style={styles.titleContainer}
          >
            <Text style={styles.gameTitle}>{t('game.title')}</Text>
            <Text style={styles.gameSubtitle}>{t('game.subtitle')}</Text>
          </MotiView>

          {/* Stats */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 300 }}
            style={styles.statsCard}
          >
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('game.guesses')}</Text>
              <Text style={styles.statValue}>{guessCount}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('game.bestScore')}</Text>
              <Text style={styles.statValuePrimary}>
                {bestScore ?? t('game.noBestScore')}
              </Text>
            </View>
          </MotiView>

          {/* Game Area */}
          <View style={styles.gameArea}>
            {gameStatus === 'won' ? (
              <MotiView
                from={{ opacity: 0, scale: 0.5, rotate: '-10deg' }}
                animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
                transition={{ type: 'spring', damping: 15 }}
                style={styles.winCard}
              >
                <Text style={styles.congratsText}>{t('game.congratulations')}</Text>
                <Text style={styles.winMessage}>{message}</Text>
                <Button
                  variant="secondary"
                  size="lg"
                  style={styles.playAgainButton}
                  onPress={handlePlayAgain}
                >
                  {t('game.playAgain')}
                </Button>
              </MotiView>
            ) : (
              <>
                {message ? (
                  <MotiView
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'spring' }}
                    key={message}
                    style={styles.messageCard}
                  >
                    <Text style={styles.messageText}>{message}</Text>
                  </MotiView>
                ) : null}

                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 400, delay: 400 }}
                  style={styles.inputContainer}
                >
                  <Text style={styles.inputLabel}>{t('game.yourGuess')}</Text>
                  <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType="number-pad"
                    placeholder="1-43"
                    placeholderTextColor={colors.placeholder}
                    maxLength={2}
                    onSubmitEditing={handleGuess}
                  />
                </MotiView>

                <Button
                  variant="primary"
                  size="lg"
                  style={styles.submitButton}
                  onPress={handleGuess}
                  disabled={!inputValue}
                >
                  {t('game.submit')}
                </Button>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <ConfirmLogoutDialog
  visible={showLogout}
  onCancel={() => setShowLogout(false)}
  onConfirm={() => {
    setShowLogout(false);
    logout();
    router.replace('/(auth)/login');
  }}
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
  gameArea: {
    flex: 1,
  },
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
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.sm,
    textAlign:'left'
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
  submitButton: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

