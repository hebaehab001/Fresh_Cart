"use client";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingBtn from "@/components/layout/Buttons/LoadingBtn";
import { usePayment } from "@/hooks/usePayment";
import { toastError } from "@/lib/toast";
import Image from "next/image";
import { ShippingAddress } from "@/types/profile.type";
export default function page() {
  const { cashPayment, onlinePayment, isProcessing } = usePayment();
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  function getShippingValues(): ShippingAddress | null {
    const values: ShippingAddress = {
      details: details.current?.value.trim() || "",
      phone: phone.current?.value.trim() || "",
      city: city.current?.value.trim() || "",
    };
    if (!values.details || !values.phone || !values.city) {
      toastError("Please fill in all shipping fields");
      return null;
    }
    return values;
  }
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <Card className="bg-white rounded-xl shadow-lg w-[90%] p-0 border border-sky-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2  min-h-[85vh] h-full justify-center p-0 ">
          <div className="relative rounded-l-xl hidden bg-muted md:block bg-linear-to-b from-sky-800 to-sky-950 text-white">
            <Image
              src="/payment.png"
              alt="Payment Image"
              fill
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
              <LoadingBtn
                isSubmitting={isProcessing === "cash"}
                onClick={() => {
                  const values = getShippingValues();
                  if (values) cashPayment(values);
                }}
                variant="outline"
                size="lg"
                className="text-lg"
                loadingTitle="Processing..."
                title="Cash Payment"
              />
              <LoadingBtn
                isSubmitting={isProcessing === "online"}
                onClick={() => {
                  const values = getShippingValues();
                  if (values) onlinePayment(values);
                }}
                variant="primary"
                size="lg"
                className="text-lg"
                loadingTitle="Processing..."
                title="Online Payment"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
