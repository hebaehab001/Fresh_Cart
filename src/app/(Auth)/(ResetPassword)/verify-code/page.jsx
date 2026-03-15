"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import PostVerifyCode from "@/APIs/PostVerfiyCode";
import { useRouter } from "next/navigation";
export default function page() {
  const [value, setValue] = useState("");
  const router = useRouter();
  async function handleVerfiyCode() {
    try {
      await PostVerifyCode(value);
      toast.success("veriFied successfully", {
        position: "bottom-right",
        duration: 3000,
      });
      router.push("/reset-password");
    } catch (error) {
      toast.error(error.response?.message ?? "Something went wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }
  return (
    <section className="flex items-center justify-center min-h-[90vh] h-full">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium">m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <InputOTP
              maxLength={6}
              id="otp-verification"
              required
              value={value}
              onChange={(value) => setValue(value)}
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
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button onClick={handleVerfiyCode} type="submit" className="w-full">
              Verify
            </Button>
            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <a
                href="#"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </section>
  );
}
