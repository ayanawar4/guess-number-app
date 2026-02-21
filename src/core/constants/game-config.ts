/**
 * Game configuration constants.
 *
 * @module constants/game-config
 *
 * @remarks
 * Central configuration for game rules and behavior.
 * Modify these values to adjust game difficulty.
 *
 * @example
 * ```typescript
 * import { GAME_CONFIG } from '@/core/constants/game-config';
 *
 * const random = Math.floor(
 *   Math.random() * (GAME_CONFIG.MAX_NUMBER - GAME_CONFIG.MIN_NUMBER + 1)
 * ) + GAME_CONFIG.MIN_NUMBER;
 * ```
 */

/**
 * Game configuration values.
 */
export const GAME_CONFIG = {
  /** Minimum number in the guessing range (inclusive) */
  MIN_NUMBER: 1,
  /** Maximum number in the guessing range (inclusive) */
  MAX_NUMBER: 43,
  /** Duration of animations in milliseconds */
  ANIMATION_DURATION: 600,
} as const;

/**
 * Type representing the game configuration.
 */
export type GameConfig = typeof GAME_CONFIG;
