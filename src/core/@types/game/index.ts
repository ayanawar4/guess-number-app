export interface GameState {
  targetNumber: number;
  currentGuess: number | null;
  guessCount: number;
  bestScore: number | null;
  gameStatus: 'idle' | 'playing' | 'won';
  message: string;
  startNewGame: () => void;
  makeGuess: (guess: number) => void;
  loadBestScore: () => void;
  resetGame: () => void;
}

export interface GuessResult {
  isCorrect: boolean;
  message: string;
  guessCount: number;
  isNewRecord: boolean;
}
