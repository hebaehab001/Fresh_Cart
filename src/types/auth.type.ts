import { ValidationError } from "./common.type";

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
  resetCode: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

// ========== RESPONSES (what you GET BACK) ==========
export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  phone?: string; // Future: when you build your backend
  avatar?: string; // Future: when you build your backend
}

export interface DecodedToken {
  id: string;
  name: string;
  role: "user" | "admin";
  iat: number; // issued at
  exp: number; // expiration
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


// ========== ERROR HANDLING ==========
export interface AuthError {
  statusMsg: "fail";
  message: string;
  errors?: ValidationError;
}

// ========== SESSION (what's available in useSession()) ==========
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
  };
  isAuthenticated: boolean;
  token?: string;
}
