/**
 * Game input management hook.
 *
 * @module hooks/useGameInput
 *
 * @remarks
 * Manages game input state with validation.
 *
 * @example
 * ```typescript
 * const { inputValue, error, handleInputChange, handleSubmit, clearInput } = useGameInput(
 *   (value) => makeGuess(value)
 * );
 * ```
 */

import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '@/core/constants/game-config';

/**
 * Hook for managing game input with validation.
 *
 * @param onSubmit - Callback when a valid guess is submitted
 * @returns Input state and handlers
 */
export function useGameInput(onSubmit: (guess: number) => void) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Validates the input value.
   *
   * @param value - Input value to validate
   * @returns True if valid, false otherwise
   */
  const validateInput = useCallback((value: string): boolean => {
    const num = Number(value);

    if (!value.trim()) {
      setError('Please enter a number');
      return false;
    }

    if (isNaN(num)) {
      setError('Please enter a valid number');
      return false;
    }

    if (num < GAME_CONFIG.MIN_NUMBER || num > GAME_CONFIG.MAX_NUMBER) {
      setError(`Please enter a number between ${GAME_CONFIG.MIN_NUMBER} and ${GAME_CONFIG.MAX_NUMBER}`);
      return false;
    }

    setError(null);
    return true;
  }, []);

  /**
   * Handles input change.
   *
   * @param text - New input value
   */
  const handleInputChange = useCallback((text: string) => {
    setInputValue(text);
    if (error) {
      setError(null);
    }
  }, [error]);

  /**
   * Handles input submission.
   */
  const handleSubmit = useCallback(() => {
    if (validateInput(inputValue)) {
      const guess = Number(inputValue);
      onSubmit(guess);
      setInputValue('');
      setError(null);
    }
  }, [inputValue, onSubmit, validateInput]);

  /**
   * Clears the input value and error.
   */
  const clearInput = useCallback(() => {
    setInputValue('');
    setError(null);
  }, []);

  return {
    inputValue,
    error,
    handleInputChange,
    handleSubmit,
    clearInput,
    setInputValue,
  };
}
