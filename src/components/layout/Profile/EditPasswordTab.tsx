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
import LoadingBtn from "../Buttons/LoadingBtn";
import { useEditPassword } from "@/hooks/useEditPassword";
export default function EditPasswordTab() {
const { form, handleUpdateData, isSubmitting } = useEditPassword();
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
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...field}
                  />
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
                  <Input type="password" placeholder="password" {...field} />
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
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingBtn
            isSubmitting={isSubmitting}
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-lg"
            loadingTitle="Submitting..."
            title="Submit"
          />
        </form>
      </Form>
    </TabsContent>
  );
}
