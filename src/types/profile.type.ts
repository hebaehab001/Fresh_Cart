import { EditProfileSchema } from "@/schema/profile.schema";
import { z } from "zod";

export type UpdateUserData = z.infer<typeof EditProfileSchema>;

export interface ShippingAddress {
  _id?: string;
  name?: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  status: string;
  results: number;
  data: ShippingAddress[];
}
