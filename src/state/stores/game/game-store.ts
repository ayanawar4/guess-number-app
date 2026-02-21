import { create } from 'zustand';
import { GameState } from '@/core/@types/game';
import { storageUtils, StorageKeys } from '@/common/utils/storage';

const generateRandomNumber = () => Math.floor(Math.random() * 43) + 1;

export const useGameStore = create<GameState>((set, get) => ({
  targetNumber: generateRandomNumber(),
  currentGuess: null,
  guessCount: 0,
  bestScore: null,
  gameStatus: 'idle',
  message: '',

  loadBestScore: () => {
    const bestScore = storageUtils.getNumber(StorageKeys.BEST_SCORE);
    set({ bestScore: bestScore ?? null });
  },

  startNewGame: () => {
    const targetNumber = generateRandomNumber();
    set({
      targetNumber,
      currentGuess: null,
      guessCount: 0,
      gameStatus: 'playing',
      message: '',
    });
  },

  makeGuess: (guess: number) => {
    const { targetNumber, guessCount, bestScore } = get();
    const newGuessCount = guessCount + 1;

    if (guess === targetNumber) {
      // User won!
      let message = 'Correct! You won!';
      let isNewRecord = false;

      // Check if it's a new record
      if (bestScore === null || newGuessCount < bestScore) {
        storageUtils.setNumber(StorageKeys.BEST_SCORE, newGuessCount);
        isNewRecord = true;
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
    } else if (guess < targetNumber) {
      set({
        currentGuess: guess,
        guessCount: newGuessCount,
        gameStatus: 'playing',
        message: 'Too low! Try a higher number.',
      });
    } else {
      set({
        currentGuess: guess,
        guessCount: newGuessCount,
        gameStatus: 'playing',
        message: 'Too high! Try a lower number.',
      });
    }
  },

  resetGame: () => {
    set({
      targetNumber: generateRandomNumber(),
      currentGuess: null,
      guessCount: 0,
      gameStatus: 'idle',
      message: '',
    });
  },
}));
