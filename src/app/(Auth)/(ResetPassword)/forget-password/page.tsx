"use client";

import { buttonVariants } from "@/components/ui/button";
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

import Link from "next/link";
import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingBtn from "@/components/layout/Buttons/LoadingBtn";
import { useForgetPassword } from "@/hooks/useForgetPassword";
export default function ForgetPassword() {
  const {
    Codevalue,
    setCodeValue,
    Emailvalue,
    ConfirmCode,
    isVerifying,
    isResending,
    handleForgetPassword,
    handleResendCode,
    handleVerfiyCode,
    form,
    isSubmitting,
  } = useForgetPassword();
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
            <Form {...form}>
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
                    <FormItem className={undefined}>
                      <FormLabel className={undefined}>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage className={undefined} />
                    </FormItem>
                  )}
                />
                <LoadingBtn
                  isSubmitting={isSubmitting}
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-lg"
                  loadingTitle="Confirming Email..."
                  title="Confirm Email"
                />
                <p className="text-center">
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "px-0!",
                    })}
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
                className={undefined}
                containerClassName={undefined}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} className={undefined} />
                  <InputOTPSlot index={1} className={undefined} />
                  <InputOTPSlot index={2} className={undefined} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} className={undefined} />
                  <InputOTPSlot index={4} className={undefined} />
                  <InputOTPSlot index={5} className={undefined} />
                </InputOTPGroup>
              </InputOTP>
              <LoadingBtn
                isSubmitting={isVerifying}
                onClick={handleVerfiyCode}
                type="button"
                variant="primary"
                size="lg"
                className="w-full text-lg"
                loadingTitle="Verifying..."
                title="Confirm Code"
              />
              <LoadingBtn
                isSubmitting={isResending}
                type="button"
                variant="link"
                size="sm"
                className="px-0!"
                loadingTitle="Resending..."
                title="Resend Confirmation Code"
                onClick={handleResendCode}
              />
            </Field>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
