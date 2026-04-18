"use client";
import React, { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartContext } from "@/Context/CartContextProvider";
import { cashPaymentAction } from "@/Actions/PaymentActions/cashPaymentAction";
import { useRouter } from "next/navigation";
import { onlinePaymentAction } from "@/Actions/PaymentActions/onlinePaymentAction";
import { toast } from "sonner";
export default function page() {
  const { cardId, afterPayment } = useContext(cartContext);
  const router = useRouter();
  const details = useRef("");
  const phone = useRef("");
  const city = useRef("");
  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };
    const data = await cashPaymentAction(cardId, values);
    if (data?.success) {
      toast.success(data.message, {
        duration: 1000,
        position: "bottom-right",
      });
      afterPayment();
      router.push("/allorders");
    } else {
      toast.error(data.message, {
        duration: 1000,
        position: "bottom-right",
      });
    }
  }
  async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };
    const data = await onlinePaymentAction(cardId, values);
    if (data?.success) {
      toast.success(data.message, {
        duration: 1000,
        position: "bottom-right",
      });
      window.location.href = data.session.url;
    } else {
      toast.error(data.message, {
        duration: 1000,
        position: "bottom-right",
      });
    }
  }
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <Card className="bg-white rounded-xl shadow-lg w-[90%] p-0 border border-sky-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2  min-h-[85vh] h-full justify-center p-0 ">
          <div className="relative rounded-l-xl hidden bg-muted md:block bg-linear-to-b from-sky-800 to-sky-950 text-white">
            <img
              src="/payment.png"
              alt="Image"
              className="absolute rounded-l-xl inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex  flex-col justify-center h-full gap-5 p-6 md:p-10"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold  text-sky-900">
                Payment
              </CardTitle>
              <p className="text-sm  text-muted-foreground">
                Enter your data below to pay
              </p>
            </CardHeader>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="details">Shipping Address Details</Label>
                <Input ref={details} id="details" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input ref={phone} id="phone" type="text" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">City</Label>
                </div>
                <Input ref={city} id="city" type="text" required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={cashPayment}
                className="py-5 bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer"
              >
                Cash Payment
              </Button>
              <Button
                onClick={onlinePayment}
                className="text-lg border bg-white border-sky-900 text-sky-900 py-5 hover:cursor-pointer rounded-lg hover:bg-sky-800 hover:text-white "
              >
                Online Payment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
