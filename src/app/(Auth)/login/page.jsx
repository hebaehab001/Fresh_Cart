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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { loginSchema } from "@/schema/login.schema";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(values) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok) {
      toast.success("login success", {
        position: "bottom-right",
        duration: 1000,
      });
      router.push(res.url || "/");
    } else {
      toast.error(res.error, {
        position: "bottom-right",
        duration: 1000,
      });
    }
  }

  return (
    <>
      <section className="flex justify-center">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-4xl">Login Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form} className="gap-2">
              <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-center justify-center w-full text-xs">
            <span>Don't have an account ? </span>
            <Link href='/register'>
              <Button variant={Link} className="px-1 text-xs underline hover:cursor-pointer hover:text-amber-950">Sign Up</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
