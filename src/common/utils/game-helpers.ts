/**
 * Game logic helper functions.
 *
 * @module utils/game-helpers
 *
 * @remarks
 * Business logic helpers for game operations.
 */

import { GAME_CONFIG } from '@/core/constants/game-config';
import type { GuessValidationResult } from '@/core/@types/game';

/**
 * Generates a random number within the game range.
 *
 * @returns Random number between MIN_NUMBER and MAX_NUMBER (inclusive)
 *
 * @example
 * ```typescript
 * const target = generateGameNumber(); // e.g., 25
 * ```
 */
export const generateGameNumber = (): number => {
  return (
    Math.floor(Math.random() * (GAME_CONFIG.MAX_NUMBER - GAME_CONFIG.MIN_NUMBER + 1)) +
    GAME_CONFIG.MIN_NUMBER
  );
};

/**
 * Validates a guess is within the acceptable range.
 *
 * @param guess - The guessed number
 * @returns Validation result with isValid flag and optional error message
 *
 * @example
 * ```typescript
 * const result = validateGuess(50);
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 * ```
 */
export const validateGuess = (guess: number): GuessValidationResult => {
  if (isNaN(guess)) {
    return {
      isValid: false,
      error: 'Please enter a valid number',
    };
  }

  if (guess < GAME_CONFIG.MIN_NUMBER || guess > GAME_CONFIG.MAX_NUMBER) {
    return {
      isValid: false,
      error: `Please enter a number between ${GAME_CONFIG.MIN_NUMBER} and ${GAME_CONFIG.MAX_NUMBER}`,
    };
  }

  return { isValid: true };
};

/**
 * Determines if a guess count is a new record.
 *
 * @param guessCount - Current guess count
 * @param bestScore - Previous best score (null if no previous score)
 * @returns True if this is a new record
 *
 * @example
 * ```typescript
 * const isRecord = isNewRecord(3, 5); // true (3 < 5)
 * const isRecord = isNewRecord(3, null); // true (first record)
 * const isRecord = isNewRecord(5, 3); // false (5 > 3)
 * ```
 */
export const isNewRecord = (guessCount: number, bestScore: number | null): boolean => {
  return bestScore === null || guessCount < bestScore;
};

/**
 * Compares guess to target and returns comparison result.
 *
 * @param guess - The guessed number
 * @param target - The target number
 * @returns Comparison result: 'correct' | 'too_high' | 'too_low'
 */
export const compareGuess = (guess: number, target: number): 'correct' | 'too_high' | 'too_low' => {
  if (guess === target) {
    return 'correct';
  }
  if (guess > target) {
    return 'too_high';
  }
  return 'too_low';
};
