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
import { registerSchema } from "@/schema/register.schema";
import PostSignup from "@/APIs/PostSignup";
export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  async function handleRegister(values) {
    try {
      await PostSignup(values);
      toast.success("registered successfully", {
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
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
                type="submit"
              >
                Create account
              </Button>
              <p className="text-center">
                Have an account ?{" "}
                <Link
                  href="/login"
                  className="px-1 underline underline-offset-4 hover:underline hover:cursor-pointer hover:text-sky-800"
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
