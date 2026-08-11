"use client";

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
import { Button } from "@/components/ui/button";
import NoProducts from "../Common/NoProducts/NoProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import LoadingBtn from "../Buttons/LoadingBtn";
import { useAddresses } from "@/hooks/useAddresses";
import { ShippingAddress } from "@/types/profile.type";
export default function AdressesTab({
  addresses,
}: {
  addresses: ShippingAddress[];
}) {
  const { open, setOpen, handleDeleteAddress, handleNewAddresses, form, isSubmitting } = useAddresses();
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
            <Button className="text-lg" variant="primary" size="lg">
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
                <LoadingBtn
                                isSubmitting={isSubmitting}
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full text-lg"
                  loadingTitle=" Saving..."
                  title="Add Address"
                              />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {addresses.length === 0 ? (
        <NoProducts text="No Addresses available." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
          {addresses.map((address) => (
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
                className=" bg-tarnsparent absolute top-3 right-2 hover:bg-transparent text-sky-900 hover:text-red-500"
                onClick={() => handleDeleteAddress(address._id)}
                size="icon-lg"
              >
                <RiDeleteBin6Line className="size-6 " />
              </Button>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
