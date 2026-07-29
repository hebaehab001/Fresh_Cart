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
import Link from "next/link";
import { Input } from "@/components/ui/input";
import LoadingBtn from "@/components/layout/Buttons/LoadingBtn";
import { useRegister } from "@/hooks/useRegister";
import Image from "next/image";
export default function Register() {
  const { handleRegister, form, isSubmitting } = useRegister();

  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <Card className="bg-white rounded-xl shadow-lg w-[90%] p-0 border border-sky-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2  min-h-[85vh] h-full justify-center p-0 ">
          <div className="relative rounded-l-xl hidden bg-muted md:block bg-linear-to-b from-sky-800 to-sky-950 text-white">
            <Image
              src="/login.png"
              alt="Register Image"
              fill
              className="absolute rounded-l-xl inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold  text-sky-900">
                  Create your account
                </CardTitle>
                <p className="text-sm  text-muted-foreground">
                  Fill in the form below to create your account
                </p>
              </CardHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />
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
                    <FormLabel className={undefined}>Password</FormLabel>
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
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm" {...field} />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone" {...field} />
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
                loadingTitle="Creating account..."
                title="Create account"
              />
              <p className="text-center">
                Have an account ?{" "}
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "px-0!",
                  })}
                >
                  LogIn
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
