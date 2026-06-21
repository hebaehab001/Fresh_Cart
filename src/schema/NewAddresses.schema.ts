import * as z from 'zod';

export const NewAddressesSchema = z.object({
    name: z.string().min(4, 'min length 4').max(20, 'max length 20'),
    details: z.string().min(10, 'min length 10').max(100, 'max length 100'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/),
    city: z.string().min(2, 'min length 2').max(50, 'max length 50')
});

