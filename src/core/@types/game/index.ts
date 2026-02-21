/**
 * Game type definitions.
 *
 * @module @types/game
 */

import type { AppError } from '../common';
import type { GameConfig } from '../../constants/game-config';

/**
 * Game status enumeration.
 */
export type GameStatus = 'idle' | 'playing' | 'won';

/**
 * Game error with specific error code.
 */
export interface GameError extends AppError {
  /** Game-specific error code */
  code: string;
}

/**
 * Result of guess validation.
 */
export interface GuessValidationResult {
  /** Whether the guess is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
}

/**
 * Game state and actions.
 */
export interface GameState {
  /** The target number to guess */
  targetNumber: number;
  /** Current guess value */
  currentGuess: number | null;
  /** Number of guesses made */
  guessCount: number;
  /** Best score (lowest guess count) */
  bestScore: number | null;
  /** Current game status */
  gameStatus: GameStatus;
  /** Feedback message for user */
  message: string;
  /** Start a new game */
  startNewGame: () => void;
  /** Make a guess */
  makeGuess: (guess: number, userId?: string) => void;
  /** Load best score from storage for a user */
  loadBestScore: (userId?: string) => void;
  /** Reset game to initial state */
  resetGame: () => void;
  /** Clear best score from storage and state for a user */
  clearBestScore: (userId?: string) => void;
}

/**
 * Result of a guess attempt.
 *
 * @remarks
 * This interface is currently unused but kept for potential future use.
 */
export interface GuessResult {
  /** Whether the guess is correct */
  isCorrect: boolean;
  /** Feedback message */
  message: string;
  /** Current guess count */
  guessCount: number;
  /** Whether this is a new record */
  isNewRecord: boolean;
}

/**
 * Re-export GameConfig type for convenience.
 */
export type { GameConfig };
