import * as z from "zod";

const passwordPolicy = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must be at most 20 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const loginSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  password: passwordPolicy,
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters")
      .max(20, "Name must be at most 20 characters"),
    email: z.email("Enter a valid email address").trim(),
    password: passwordPolicy,
    rePassword: z.string(),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords don't match",
  });

export const verifyEmailSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
});

export const updateLoggedUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: passwordPolicy,
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords don't match",
  });

export const ResetPasswordSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  newPassword: passwordPolicy,
});