import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
  updateLoggedUserPasswordSchema,
  ResetPasswordSchema,
} from "@/schema/auth.schema";


export type LoginCredentials = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof registerSchema>;
export type ForgetPasswordData = z.infer<typeof verifyEmailSchema>;
export type UpdatePasswordData = z.infer<typeof updateLoggedUserPasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
