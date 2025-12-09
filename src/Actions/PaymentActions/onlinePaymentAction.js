'use server'
import PostOnlinePayemnt from "@/APIs/PostOnlinePayment";
import { getMyToken } from "@/utilities/token"

export async function onlinePaymentAction(productsId, data) {
    const token = await getMyToken();
    if (!token) {
        throw Error('login first')
    }
    return  await PostOnlinePayemnt({ token: token, productsId: productsId, data: data });
}