"use client"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schema/EditProfile.schema";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateUserInfoAction } from "@/Actions/ProfileActions/updateUserInfoAction";
import { UpdateUserData } from "@/types/auth.type";
export default function EditProfileTab() {
  const { data: session, update } = useSession();
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: session?.user?.phone || "",
    },
  });
  useEffect(() => {
    if (session) {
      form.reset({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: session?.user?.phone || "",
      });
    }
  }, [session, form]);
  async function handleUpdateData(values: UpdateUserData) {
    const data = await updateUserInfoAction({
      name: values.name,
      phone: values.phone,
    });
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      await update({ name: values.name });
    } else {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  return (
    <TabsContent
      className="flex h-full items-center justify-center"
      value="EditProfile"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateData)}
          className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10 w-full"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold  text-sky-900">
              Account Information
            </CardTitle>
            <p className="text-sm  text-muted-foreground">
              Change User Information here
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
          <Button
            className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
            type="submit" variant={undefined} size={undefined}          >
            Update Information
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}
