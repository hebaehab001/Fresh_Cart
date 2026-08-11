"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
import { updateLoggedUserPasswordAction } from "@/Actions/ProfileActions/updateLoggedUserPasswordAction";
import { UpdatePasswordData } from "@/types/auth.type";
import { updateLoggedUserPasswordSchema } from "@/schema/auth.schema";
export function useEditPassword() {
    const form = useForm({
      resolver: zodResolver(updateLoggedUserPasswordSchema),
      defaultValues: {
        currentPassword: "",
        password: "",
        rePassword: "",
      },
    });
    const {
      formState: { isSubmitting },
    } = form;
    
    async function handleUpdateData(values: UpdatePasswordData) {
      try {
        const data = await updateLoggedUserPasswordAction(values);
        if (data?.success) {
          toastSuccess(data.message);
          form.reset();
        } else {
          toastError(data?.message);
        }
      } catch {
        toastError();
      }
    }

  return {
    handleUpdateData,
    form,
    isSubmitting,
  };
}
