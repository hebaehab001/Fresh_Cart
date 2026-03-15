"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostForgotPassword from "@/APIs/PostForgotPassword";
import { verifyPasswordSchema } from "@/schema/verifyPassword.schema";
export default function page() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(verifyPasswordSchema),
  });
  async function handleResetPassword(values) {
      try {
            await PostForgotPassword(values);
            toast.success("veriFied successfully", {
              position: "bottom-right",
              duration: 3000,
            });
            router.push("/verify-code");
          } catch (error) {
            toast.error(error.response?.data?.message ?? "Something went wrong", {
              position: "bottom-right",
              duration: 3000,
            });
          }
    }
  return (
    <section className="flex items-center justify-center min-h-[90vh] h-full">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-4xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} className="gap-2">
            <form
              onSubmit={form.handleSubmit(handleResetPassword)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Verify Email</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center justify-center w-full text-xs">
          <Link href="/login">
            <Button
              variant={Link}
              className="px-1 text-xs hover:cursor-pointer hover:text-amber-950"
            >
              Back To Login Screen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
