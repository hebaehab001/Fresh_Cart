import * as z from "zod";

export const EditProfileSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name must be at most 20 characters"),
  email: z.email("Enter a valid email address").trim(),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});

export const NewAddressesSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name must be at most 20 characters"),
  details: z
    .string()
    .min(10, "Please provide more detail (at least 10 characters)")
    .max(100, "Details must be under 100 characters"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z
    .string()
    .min(2, "City name is too short")
    .max(50, "City name is too long"),
});
