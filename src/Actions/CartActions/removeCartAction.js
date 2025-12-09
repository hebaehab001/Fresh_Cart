'use server'
import DeleteCart from "@/APIs/DeleteCart";
import { getMyToken } from"@/utilities/token"

export async function removeCartAction(id) {
  const token = await getMyToken();
  if (!token) {
    throw Error('login first')
  }
  return  await DeleteCart({ productId: id, token: token });
}