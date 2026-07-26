"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toastSuccess, toastError } from "@/lib/toast";
import { ShippingAddress } from "@/types/addresses.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postNewAddresseAction } from "@/Actions/ProfileActions/postNewAddresseAction";
import { NewAddressesSchema } from "@/schema/NewAddresses.schema";
import { removeAddressAction } from "@/Actions/ProfileActions/removeAddressAction";
export function useAddresses() {
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
  const {
    formState: { isSubmitting },
  } = form;

  async function handleDeleteAddress(id: string) {
    try {
      await removeAddressAction(id);
      toastSuccess("Address removed successfully");
      router.refresh();
    } catch(error) {
      toastError( error?.message || "Failed to remove address");
    }
  }

  async function handleNewAddresses(values: ShippingAddress) {
    try {
      await postNewAddresseAction(values);
      toastSuccess("Address added successfully");
      setOpen(false);
      form.reset();
      router.refresh();
    } catch(error) {
      toastError( error?.message || "Failed to add address");
    }
  }
  return {
    open,
    form,
    setOpen,
    handleDeleteAddress,
    handleNewAddresses,
    isSubmitting,
  };
}
