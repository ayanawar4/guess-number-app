import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'usernameRequired').min(3, 'usernameMinLength'),
  password: z.string().min(1, 'passwordRequired').min(6, 'passwordMinLength'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
