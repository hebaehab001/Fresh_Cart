import * as z from 'zod';

export const EditProfileSchema = z.object({
    name: z.string().min(4, 'min length 4').max(20, 'max length 20'),
    email: z.email("invalid email"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/)
})

