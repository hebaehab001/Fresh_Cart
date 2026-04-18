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
import { ResetPasswordSchema } from "@/schema/resetPassword.schema";
import UpdateUserPassword from "@/APIs/Auth/updateUserPassword";
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
    const data = await UpdateUserPassword(values);
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      router.push("/login");
    } else {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <Card className="bg-white rounded-xl shadow-lg w-[90%] p-0 border border-sky-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2  min-h-[85vh] h-full justify-center p-0 ">
          <div className="relative rounded-l-xl hidden bg-muted md:block bg-linear-to-b from-sky-800 to-sky-950 text-white">
            <img
              src="/newpassword.png"
              alt="Image"
              className="absolute rounded-l-xl inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleResetPassword)}
              className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold  text-sky-900">
                  Reset Password
                </CardTitle>
                <p className="text-sm  text-muted-foreground">
                  Please write your new password
                </p>
              </CardHeader>
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
                        placeholder="new Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
                type="submit"
              >
                Confirm Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
