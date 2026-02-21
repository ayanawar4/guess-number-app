import { z } from 'zod';

export const guessSchema = z.object({
  guess: z
    .number({ message: 'Please enter a number' })
    .int({ message: 'Number must be a whole number' })
    .min(1, { message: 'Number must be between 1 and 43' })
    .max(43, { message: 'Number must be between 1 and 43' }),
});

export type GuessFormData = z.infer<typeof guessSchema>;
