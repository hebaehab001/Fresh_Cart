"use client";
import React, {useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import NoProducts from "../Common/NoProducts/NoProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import { postNewAddresseAction } from "@/Actions/ProfileActions/postNewAddresseAction";
import { NewAddressesSchema } from "@/schema/NewAddresses.schema";
import { useRouter } from "next/navigation";
import { removeAddressAction } from "@/Actions/ProfileActions/removeAddressAction";
export default function AdressesTab({ Addresses }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(NewAddressesSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function handleDeleteAddress(id) {
    try {
      await removeAddressAction(id);
      toast.success("Address removed successfully", {
        position: "bottom-right",
        duration: 3000,
      });
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Something went wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  async function handleNewAddresses(values) {
    try {
      await postNewAddresseAction(values);
      toast.success("Data Added successfully", {
        position: "bottom-right",
        duration: 3000,
      });
      setOpen(false); 
      form.reset(); 
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Something went wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }
  return (
    <TabsContent
      className="h-full w-full flex flex-col gap-6"
      value="Addresses"
    >
      <div className="flex justify-between w-full">
        <div className="w-80% space-y-2">
          <CardTitle className="text-4xl font-bold  text-sky-900">
            Saved Points
          </CardTitle>
          <p className="text-sm  text-muted-foreground">
            Manage your default shipping locations.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer">
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold  text-sky-900">
                New Address
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleNewAddresses)}
                className="flex  flex-col justify-center h-full gap-5 py-4 w-full"
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
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>details</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="details" {...field} />
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
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Add Address"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {Addresses.Addresses.length === 0 ? (
        <NoProducts text="No Addresses available." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
          {Addresses.Addresses.map((address) => (
            <div
              key={address._id}
              className="border-sky-900 relative border col-span-1 rounded-lg shadow-md p-4"
            >
              <h3 className="font-bold text-lg">{address.name}</h3>
              <p className="text-muted-foreground">City : {address.city}</p>
              <p className="text-muted-foreground">
                Details : {address.details}
              </p>
              <p className="text-muted-foreground">Phone : {address.phone}</p>
              <Button
                className=" bg-white absolute top-3 right-2 hover:bg-white cursor-pointer text-sky-900 hover:text-red-600"
                onClick={() => handleDeleteAddress(address._id)}
              >
                <RiDeleteBin6Line className="size-5 " />
              </Button>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
