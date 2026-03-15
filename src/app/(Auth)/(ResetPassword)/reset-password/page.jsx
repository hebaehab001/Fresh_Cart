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
import { ResetPasswordSchema } from "@/schema/resetPassword.schema";
import UpdateUserPassword from "@/APIs/UpdateUserPassword";
export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });
  async function handleResetPassword(values) {
    try {
      await UpdateUserPassword(values);
      toast.success("Password Updated successfully", {
        position: "bottom-right",
        duration: 3000,
      });
      router.push("/login");
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
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="newPassword"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Reset Password</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center justify-center w-full text-xs">
          <span>Have an account ? </span>
          <Link href="/login">
            <Button
              variant={Link}
              className="px-1 text-xs underline hover:cursor-pointer hover:text-amber-950"
            >
              LogIn
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
