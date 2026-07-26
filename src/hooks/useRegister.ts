"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
import { registerSchema } from "@/schema/register.schema";
import { postSignup } from "@/APIs/auth.api";
import { SignupData } from "@/types/auth.type";

export function useRegister() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function handleRegister(values: SignupData) {
    const data = await postSignup(values);
    if (data?.success) {
      toastSuccess(data.message);
      router.push("/login");
    } else {
      toastError(data.message);
    }
  }

  return { handleRegister, form, isSubmitting };
}
