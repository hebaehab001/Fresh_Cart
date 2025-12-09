'use server'
import PostCart from "@/APIs/PostCart";
import { getMyToken } from "@/utilities/token"

export async function AddToCartAction(id){
    const token=await getMyToken();
    return  await PostCart({ productId: id, token: token });
}