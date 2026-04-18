"use client";
import React, { useState } from "react";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostForgotPassword from "@/APIs/Auth/postForgotPassword";
import { verifyPasswordSchema } from "@/schema/verifyPassword.schema";
import { Field} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RefreshCwIcon } from "lucide-react";
import PostVerifyCode from "@/APIs/Auth/postVerfiyCode";
export default function page() {
  const [Codevalue, setCodeValue] = useState("");
  const [Emailvalue, setEmailvalue] = useState("");
  const [ConfirmCode, setConfirmCode] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(verifyPasswordSchema),
  });
  async function handleForgetPassword(Values) {
    setEmailvalue(Values.email);
    const data = await PostForgotPassword(Values);
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      setConfirmCode(true);
    } else {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }
  async function handleResendCode() {
    const data = await PostForgotPassword({ email: Emailvalue });
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      setConfirmCode(true);
    } else {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }
  async function handleVerfiyCode() {
    const data = await PostVerifyCode(Codevalue);
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      router.push("/reset-password");
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
              src={
                ConfirmCode ? "/Otp_authentication.png" : "/forgetpassword.png"
              }
              alt="Image"
              className="absolute rounded-l-xl inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          {!ConfirmCode ? (
            <Form {...form} className="gap-2">
              <form
                onSubmit={form.handleSubmit(handleForgetPassword)}
                className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold  text-sky-900">
                    Forget Your Password ?
                  </CardTitle>
                  <p className="text-sm  text-muted-foreground">
                    Please write your email to recieve a confirmation code to
                    set a new password
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
                <Button
                  className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
                  type="submit"
                >
                  Confirm Email
                </Button>
                <p className="text-center">
                  <Link
                    href="/login"
                    className="px-1 underline underline-offset-4 hover:underline hover:cursor-pointer hover:text-sky-800"
                  >
                    Back To Login Screen
                  </Link>
                </p>
              </form>
            </Form>
          ) : (
            <Field className="flex  flex-col justify-center items-center h-full gap-5 p-6 md:p-10">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold  text-sky-900">
                  Verify your email address
                </CardTitle>
                <CardDescription className="text-sm  text-muted-foreground">
                  Enter the verification code we sent to your email address:{" "}
                  <span className="font-medium">{Emailvalue}</span>.
                </CardDescription>
              </CardHeader>
              <InputOTP
                maxLength={6}
                id="otp-verification"
                required
                value={Codevalue}
                onChange={(value) => setCodeValue(value)}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
                type="submit"
                onClick={handleVerfiyCode}
              >
                Confirm Code
              </Button>
              <Button
                onClick={handleResendCode}
                className="px-1 underline underline-offset-4 hover:underline hover:cursor-pointer hover:text-sky-800"
                variant="none"
                size="sm"
              >
                <RefreshCwIcon />
                Resend Confirmation Code
              </Button>
            </Field>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
