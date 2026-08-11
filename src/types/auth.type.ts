import { ValidationError } from "./common.type";
import { User } from "next-auth";

// ========== REQUEST TYPES ==========
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface VerifyResetCodeData {
  resetCode: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

// ========== RESPONSE TYPES ==========
export interface DecodedToken {
  id: string;
  name: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
}

export interface LoginResponse {
  statusMsg: "success" | "fail";
  message: string;
  user?: User;
  token?: string;
}

export interface SignupResponse {
  statusMsg: "success" | "fail";
  message: string;
  user?: User;
  token?: string;
}

export interface VerifyTokenResponse {
  message: string;
  decoded: DecodedToken;
}

// export interface AuthError {
//   statusMsg: "fail";
//   message: string;
//   errors?: ValidationError;
// }

// export interface AuthSession {
//   user: {
//     id: string;
//     email: string;
//     name: string;
//     role: "user" | "admin";
//   };
//   isAuthenticated: boolean;
//   token?: string;
// }