import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "min length 6").max(20, "max length 20"),
});

export const registerSchema = z
  .object({
    name: z.string().min(4, "min length 4").max(20, "max length 20"),
    email: z.email("invalid email"),
    password: z.string().min(6, "min length 6").max(20, "max length 20"),
    rePassword: z.string().min(6, "min length 6").max(20, "max length 20"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/),
  })
  .refine(
    function (object) {
      if (object.password === object.rePassword) {
        return true;
      }
      return false;
    },
    {
      path: ["rePassword"],
      error: "password doesn't match",
    },
  );

export const verifyEmailSchema = z.object({
  email: z.email("invalid email"),
});

export const updateLoggedUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "min length 6").max(20, "max length 20"),
    password: z.string().min(6, "min length 6").max(20, "max length 20"),
    rePassword: z.string().min(6, "min length 6").max(20, "max length 20"),
  })
  .refine(
    function (object) {
      if (object.password === object.rePassword) {
        return true;
      }
      return false;
    },
    {
      path: ["rePassword"],
      error: "password doesn't match",
    },
  );

export const ResetPasswordSchema = z.object({
  email: z.email("invalid email"),
  newPassword: z.string().min(6, "min length 6").max(20, "max length 20"),
});