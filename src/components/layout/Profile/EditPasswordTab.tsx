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
import { updateLoggedUserPasswordSchema } from "@/schema/updateLoggedUserPassword.schema";
import { toast } from "sonner";
import { updateLoggedUserPasswordAction } from "@/Actions/ProfileActions/updateLoggedUserPasswordAction";
import { UpdatePasswordData } from "@/types/auth.type";
export default function EditPasswordTab() {
  const form = useForm({
    resolver: zodResolver(updateLoggedUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });
  async function handleUpdateData(values:UpdatePasswordData) {
    const data = await updateLoggedUserPasswordAction(values);
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
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
      value="Password & Security"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateData)}
          className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10 w-full"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold  text-sky-900">
              Update Security
            </CardTitle>
            <p className="text-sm  text-muted-foreground">
              Enter your current credentials to verify identity.
            </p>
          </CardHeader>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className={undefined}>
                <FormLabel className={undefined}>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...field}
                  />
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
                  <Input type="password" placeholder="password" {...field} />
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
                <FormLabel className={undefined}>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={undefined} />
              </FormItem>
            )}
          />
          <Button
            className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
            type="submit" variant={undefined} size={undefined}          >
            Submit
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}
