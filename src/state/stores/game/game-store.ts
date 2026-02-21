/**
 * Game store.
 *
 * @module stores/game
 *
 * @remarks
 * Manages game state including guesses, score tracking, and game status.
 * Uses MMKV for persistent storage of best score per user.
 */

import { create } from 'zustand';
import { GameState } from '@/core/@types/game';
import { storageUtils, STORAGE_KEYS } from '@/common/utils/storage';
import { generateGameNumber, compareGuess, isNewRecord } from '@/common/utils/game-helpers';

/**
 * Gets the storage key for a user's best score.
 *
 * @param userId - User ID
 * @returns Storage key for the user's best score
 */
const getBestScoreKey = (userId: string): string => {
  return `${STORAGE_KEYS.BEST_SCORE}_${userId}`;
};

/**
 * Game store hook.
 *
 * @returns Game state and actions
 *
 * @example
 * ```typescript
 * const { makeGuess, startNewGame, guessCount } = useGameStore();
 *
 * startNewGame();
 * makeGuess(25);
 * console.log(guessCount); // 1
 * ```
 */
export const useGameStore = create<GameState>((set, get) => ({
  targetNumber: 0, // Will be set by startNewGame()
  currentGuess: null,
  guessCount: 0,
  bestScore: null,
  gameStatus: 'idle',
  message: '',

  /**
   * Loads best score from storage for the current user.
   *
   * @param userId - User ID to load best score for
   *
   * @remarks
   * Called on app start to restore user-specific best score.
   */
  loadBestScore: (userId?: string) => {
    if (!userId) {
      set({ bestScore: null });
      return;
    }

    const bestScoreKey = getBestScoreKey(userId);
    const bestScore = storageUtils.getNumber(bestScoreKey);
    set({ bestScore: bestScore ?? null });
  },

  /**
   * Starts a new game.
   *
   * @remarks
   * Generates new random number and resets game state.
   */
  startNewGame: () => {
    const targetNumber = generateGameNumber();
    set({
      targetNumber,
      currentGuess: null,
      guessCount: 0,
      gameStatus: 'playing',
      message: '',
    });
  },

  /**
   * Makes a guess.
   *
   * @param guess - The guessed number
   * @param userId - User ID to save best score for
   *
   * @remarks
   * Updates game state based on guess result.
   * Saves new best score per user if applicable.
   */
  makeGuess: (guess: number, userId?: string) => {
    const { targetNumber, guessCount, bestScore } = get();
    const newGuessCount = guessCount + 1;
    const result = compareGuess(guess, targetNumber);

    if (result === 'correct') {
      // User won!
      let message = 'Correct! You won!';

      // Check if it's a new record
      if (isNewRecord(newGuessCount, bestScore)) {
        // Save best score per user
        if (userId) {
          const bestScoreKey = getBestScoreKey(userId);
          storageUtils.setNumber(bestScoreKey, newGuessCount);
        }

        message = `New record! You guessed it in ${newGuessCount} ${
          newGuessCount === 1 ? 'try' : 'tries'
        }!`;
        set({ bestScore: newGuessCount });
      }

      set({
        currentGuess: guess,
        guessCount: newGuessCount,
        gameStatus: 'won',
        message,
      });
    } else {
      // Determine message based on result
      const message =
        result === 'too_low'
          ? 'Too low! Try a higher number.'
          : 'Too high! Try a lower number.';

      set({
        currentGuess: guess,
        guessCount: newGuessCount,
        gameStatus: 'playing',
        message,
      });
    }
  },

  /**
   * Resets game to initial state.
   *
   * @remarks
   * Generates new random number and clears all game state.
   */
  resetGame: () => {
    set({
      targetNumber: generateGameNumber(),
      currentGuess: null,
      guessCount: 0,
      gameStatus: 'idle',
      message: '',
    });
  },

  /**
   * Clears the best score from storage and state for a specific user.
   *
   * @param userId - User ID to clear best score for
   *
   * @remarks
   * Useful for testing or resetting a user's game progress.
   */
  clearBestScore: (userId?: string) => {
    if (userId) {
      const bestScoreKey = getBestScoreKey(userId);
      storageUtils.delete(bestScoreKey);
    }
    set({ bestScore: null });
  },
}));
