import * as z from 'zod';

export const verifyPasswordSchema = z.object({
    email: z.email("invalid email")
})