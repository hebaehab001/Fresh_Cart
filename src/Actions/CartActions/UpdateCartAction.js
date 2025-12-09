"use server"
import UpdateCart from "@/APIs/UpdateCart";
import { getMyToken } from "@/utilities/token"

export async function updateCartAction(id,count) {
    const token = await getMyToken();
    if (!token) {
        throw Error('login first')
    }
    return  await UpdateCart({ productId: id, token: token, count: count });
}