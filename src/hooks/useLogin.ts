"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginCredentials } from "@/types/auth.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/lib/toast";
import { loginSchema } from "@/schema/auth.schema";

export function useLogin() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function handleLogin(values: LoginCredentials) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.ok) {
        toastSuccess("login success");
        router.refresh();
        router.push(res.url || "/");
      } else {
        toastError(res?.error || "Login failed");
      }
    } catch {
      toastError();
    }
  }

  return { handleLogin, form, isSubmitting };
}
