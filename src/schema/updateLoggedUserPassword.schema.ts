import * as z from 'zod';

export const updateLoggedUserPasswordSchema = z.object({
    currentPassword: z.string().min(6, 'min length 6').max(20, 'max length 20'),
    password: z.string().min(6, 'min length 6').max(20, 'max length 20'),
    rePassword: z.string().min(6, 'min length 6').max(20, 'max length 20'),
}).refine(function (object) {
    if (object.password === object.rePassword) {
        return true;
    }
    return false;

}, {
    path: ["rePassword"],
    error: "password doesn't match"
}
)