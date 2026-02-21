import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, 'usernameRequired').min(3, 'usernameMinLength'),
    email: z
      .string()
      .min(1, 'emailRequired')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'emailInvalid',
      }),
    password: z.string().min(1, 'passwordRequired').min(6, 'passwordMinLength'),
    confirmPassword: z.string().min(1, 'confirmPasswordRequired').min(6, 'passwordMinLength'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
