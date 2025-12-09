'use server'
import PostCashPayemnt from "@/APIs/PostCashPayment";
import { getMyToken } from "@/utilities/token"

export async function cashPaymentAction(productsId, data) {
    const token = await getMyToken();
    if (!token) {
        throw Error('login first')
    }
    return  await PostCashPayemnt({ token: token, productsId: productsId, data: data });
}