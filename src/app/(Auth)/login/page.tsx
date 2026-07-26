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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import LoadingBtn from "@/components/layout/Buttons/LoadingBtn";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const { handleLogin, form, isSubmitting } = useLogin();
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <Card className="bg-white rounded-xl shadow-lg w-[90%] p-0 border border-sky-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2  min-h-[85vh] h-full justify-center p-0 ">
          <div className="relative rounded-l-xl hidden bg-muted md:block bg-linear-to-b from-sky-800 to-sky-950 text-white">
            <img
              src="/login.png"
              alt="Image"
              className="absolute rounded-l-xl inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold  text-sky-900">
                  Login to your account
                </CardTitle>
                <p className="text-sm  text-muted-foreground">
                  Enter your email below to login to your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <div className="flex justify-between">
                      <FormLabel className={undefined}>Password</FormLabel>
                      <Link
                        href="/forget-password"
                        className={buttonVariants({
                          variant: "link",
                          size: "sm",
                          className: "text-xs",
                        })}
                      >
                        Forget Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
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
                loadingTitle="Logging in..."
                title="Login"
              />
              <p className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "px-0!",
                  })}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
