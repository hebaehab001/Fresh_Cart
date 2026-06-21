import * as z from 'zod';

export const ResetPasswordSchema = z.object({
    email: z.email("invalid email"),
    newPassword: z.string().min(6, 'min length 6').max(20, 'max length 20')
})