import { JWT } from "next-auth/jwt";

export interface CustomJWT extends JWT {
  token?: string;
}