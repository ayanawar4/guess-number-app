/**
 * Game actions hook.
 *
 * @module hooks/useGameActions
 *
 * @remarks
 * Encapsulates game logic and actions with memoized callbacks for performance.
 *
 * @example
 * ```typescript
 * const { handleGuess, handlePlayAgain } = useGameActions();
 *
 * handleGuess(25);
 * handlePlayAgain();
 * ```
 */

import { useCallback } from 'react';
import { useGameStore } from '@/state/stores/game/game-store';

/**
 * Hook that provides game actions with memoized callbacks.
 *
 * @returns Game action handlers
 */
export function useGameActions() {
  const makeGuess = useGameStore((state) => state.makeGuess);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const resetGame = useGameStore((state) => state.resetGame);

  /**
   * Handles a user guess.
   *
   * @param guess - The guessed number
   */
  const handleGuess = useCallback(
    (guess: number) => {
      makeGuess(guess);
    },
    [makeGuess]
  );

  /**
   * Starts a new game.
   */
  const handlePlayAgain = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  /**
   * Resets the game to initial state.
   */
  const handleReset = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    handleGuess,
    handlePlayAgain,
    handleReset,
  };
}
