"use client";
import { useRouter } from "next/navigation";
import { verifyPasswordSchema } from "@/schema/verifyPassword.schema";
import { ForgetPasswordData } from "@/types/auth.type";
import { PostForgotPassword, postVerifyCode } from "@/APIs/auth.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
export function useForgetPassword() {
  const [Codevalue, setCodeValue] = useState("");
  const [Emailvalue, setEmailvalue] = useState("");
  const [ConfirmCode, setConfirmCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(verifyPasswordSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function handleForgetPassword(Values: ForgetPasswordData) {
    setEmailvalue(Values.email);
    try {
      const data = await PostForgotPassword(Values);
      if (data?.success) {
        toastSuccess(data.message);
        setConfirmCode(true);
      } else {
        toastError(data?.message || "Couldn't send reset code");
      }
    } catch {
      toastError();
    }
  }
  async function handleResendCode() {
    setIsResending(true);
    try {
      const data = await PostForgotPassword({ email: Emailvalue });
      if (data?.success) {
        toastSuccess(data.message);
        setConfirmCode(true);
      } else {
        toastError(data?.message || "Couldn't resend code");
      }
    } catch (err) {
      toastError();
    } finally {
      setIsResending(false);
    }
  }
  async function handleVerfiyCode() {
    setIsVerifying(true);
    try {
      const data = await postVerifyCode({ resetCode: Codevalue });
      if (data?.success) {
        toastSuccess(data.message);
        router.push("/reset-password");
      } else {
        toastError(data?.message || "Invalid code");
      }
    } catch {
      toastError();
    } finally {
      setIsVerifying(false);
    }
  }

  return {
    Codevalue,
    Emailvalue,
    setCodeValue,
    ConfirmCode,
    isVerifying,
    isResending,
    handleForgetPassword,
    handleResendCode,
    handleVerfiyCode,
    form,
    isSubmitting,
  };
}
