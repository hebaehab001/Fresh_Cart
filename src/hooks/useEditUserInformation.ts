"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
import { EditProfileSchema } from "@/schema/EditProfile.schema";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { updateUserInfoAction } from "@/Actions/ProfileActions/updateUserInfoAction";
import { UpdateUserData } from "@/types/auth.type";
export function useEditUserInformation() {
  const { data: session, update } = useSession();
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: session?.user?.phone || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  useEffect(() => {
    if (session) {
      form.reset({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: session?.user?.phone || "",
      });
    }
  }, [session, form]);

  async function handleUpdateData(values: UpdateUserData) {
    try {
      const data = await updateUserInfoAction({
        name: values.name,
        phone: values.phone,
      });
      if (data?.success) {
        toastSuccess(data.message);
        await update({ name: values.name });
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
