import { ApiDataParams, ApiResponse } from "@/types/api.types";
import {
  ForgetPasswordData,
  ResetPasswordData,
  SignupData,
  UpdatePasswordData,
  UpdateUserData,
  VerifyResetCodeData,
} from "@/types/auth.type";

export async function updateLoggedUserPassword({
  data,
  token,
}: ApiDataParams<UpdatePasswordData>): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PUT_LOGGED_USER_PASSWORD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update password from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Password updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function updateUserData({
  token,
  data,
}: ApiDataParams<UpdateUserData>): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PUT_USERDATA, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message || "Failed to update user data from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "User data updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function PostForgotPassword(
  data: ApiDataParams<ForgetPasswordData>,
): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_FORGETPASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message || "Failed to send verification code from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Verification code sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function postSignup(
  data: ApiDataParams<SignupData>,
): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to register.",
      };
    }

    return {
      success: true,
      message: result.message || "Registered successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function postVerifyCode(
  data: ApiDataParams<VerifyResetCodeData>,
): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_VERIFYCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: data }),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to verify code from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function updateUserPassword(
  data: ApiDataParams<ResetPasswordData>,
): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_RESETPASSWORD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update password from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Password updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}