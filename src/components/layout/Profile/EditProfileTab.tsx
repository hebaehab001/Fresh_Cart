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
import { useEditUserInformation } from "@/hooks/useEditUserInformation";
export default function EditProfileTab() {
  const { form, handleUpdateData, isSubmitting } = useEditUserInformation();
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
                  <Input type="email" placeholder="email" disabled {...field} />
                </FormControl>
                <p className="text-xs text-muted-foreground ml-2">
                  Email cannot be changed
                </p>
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
            loadingTitle="Updating..."
            title="Update Information"
          />
        </form>
      </Form>
    </TabsContent>
  );
}
