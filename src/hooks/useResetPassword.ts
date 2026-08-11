"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
import { ResetPasswordData } from "@/types/auth.type";
import { updateUserPassword } from "@/APIs/auth.api";
import { ResetPasswordSchema } from "@/schema/auth.schema";
export function useResetPassword() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function handleResetPassword(values: ResetPasswordData) {
    const data = await updateUserPassword(values);
    if (data?.success) {
      toastSuccess(data.message);
      router.push("/login");
    } else {
      toastError(data?.message);
    }
  }

  return {
    handleResetPassword,
    form,
    isSubmitting,
  };
}
