'use server'
import DeleteAllCarts from "@/APIs/DeleteAllCarts";
import { getMyToken } from"@/utilities/token"

export async function clearAllCartsAction() {
  const token = await getMyToken();
  if (!token) {
    throw Error('login first')
  }
  return  await DeleteAllCarts({ token: token });
}