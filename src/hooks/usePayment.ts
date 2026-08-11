"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { cartContext } from "@/Context/CartContextProvider";
import { cashPaymentAction } from "@/Actions/PaymentActions/cashPaymentAction";
import { onlinePaymentAction } from "@/Actions/PaymentActions/onlinePaymentAction";
import { toastSuccess, toastError } from "@/lib/toast";
import { ShippingAddress } from "@/types/profile.type";

export function usePayment() {
  const { cartId, afterPayment } = useContext(cartContext);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<"cash" | "online" | null>(
    null,
  );

  async function cashPayment(values: ShippingAddress) {
    setIsProcessing("cash");
    try {
      const data = await cashPaymentAction(cartId, values);
      if (data?.success) {
        toastSuccess(data.message);
        afterPayment();
        router.push("/allorders");
      } else {
        toastError(data?.message);
      }
    } catch {
      toastError();
    } finally {
      setIsProcessing(null);
    }
  }

  async function onlinePayment(values: ShippingAddress) {
    setIsProcessing("online");
    try {
      const data = await onlinePaymentAction(cartId, values);
      if (data?.success) {
        console.log("data", data);
        toastSuccess(data.message);
        window.location.href = data.session.url;
      } else {
        toastError(data?.message);
      }
    } catch {
      toastError();
    } finally {
      setIsProcessing(null);
    }
  }

  return { cashPayment, onlinePayment, isProcessing };
}
