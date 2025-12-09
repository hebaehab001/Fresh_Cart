"use client";
import React, { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    try {
      const data = await cashPaymentAction(cardId, values);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.status, {
          duration: 1000,
          position: "bottom-right",
        });
        afterPayment();
        router.push("/allorders");
      } else {
        toast.error("faild to remove this from cart", {
          duration: 1000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
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
    try {
      const data = await onlinePaymentAction(cardId, values);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.status, {
          duration: 1000,
          position: "bottom-right",
        });
        window.location.href = data.session.url;
      } else {
        toast.error("faild to remove this from cart", {
          duration: 1000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="bg-gray-100 min-h-[90vh] p-4 flex flex-col items-center justify-center w-full">
      <Card className="w-[30%] max-w-[40%] h-auto">
        <CardHeader className="text-center">
          <CardTitle className='text-3xl'>payment</CardTitle>
          <CardDescription>
            Enter your data below to pay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
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
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={cashPayment}
            type="submit"
            className="w-full bg-sky-900 text-white py-3 rounded-lg hover:bg-sky-800 transition duration-150 font-semibold shadow-md"
          >
            Cash Payment
          </Button>
          <Button
            onClick={onlinePayment}
            type="submit"
            className="w-full border bg-white border-sky-900 text-sky-900 py-3 rounded-lg hover:bg-sky-800 hover:text-white transition duration-150 font-semibold shadow-md"
          >
            Online Payment
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
