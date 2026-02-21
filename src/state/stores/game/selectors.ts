/**
 * Game store selectors.
 *
 * @module stores/game/selectors
 *
 * @remarks
 * Memoized selectors for accessing game state.
 * Use these for better performance when subscribing to specific state slices.
 */

import type { GameState, GameStatus } from '@/core/@types/game';

/**
 * Selects the game status.
 *
 * @param state - Game state
 * @returns Current game status
 */
export const selectGameStatus = (state: GameState): GameStatus => state.gameStatus;

/**
 * Selects the current guess count.
 *
 * @param state - Game state
 * @returns Current guess count
 */
export const selectGuessCount = (state: GameState): number => state.guessCount;

/**
 * Selects the best score.
 *
 * @param state - Game state
 * @returns Best score or null
 */
export const selectBestScore = (state: GameState): number | null => state.bestScore;

/**
 * Selects game statistics.
 *
 * @param state - Game state
 * @returns Object containing guess count and best score
 */
export const selectStats = (state: GameState) => ({
  guessCount: state.guessCount,
  bestScore: state.bestScore,
});

/**
 * Selects the current feedback message.
 *
 * @param state - Game state
 * @returns Feedback message
 */
export const selectMessage = (state: GameState): string => state.message;

/**
 * Selects whether the game is won.
 *
 * @param state - Game state
 * @returns True if game is won
 */
export const selectIsWon = (state: GameState): boolean => state.gameStatus === 'won';
