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
    <>
      <section className="flex justify-center">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-4xl">Register Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form} className="gap-2">
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="flex flex-col gap-5"
              >
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
                        <Input
                          type="password"
                          placeholder="Confirm"
                          {...field}
                        />
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
                <Button type="submit">Register</Button>
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
    </>
  );
}
