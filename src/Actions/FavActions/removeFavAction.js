'use server'
import DeleteFav from "@/APIs/DeleteFav";
import { getMyToken } from"@/utilities/token"

export async function removeFavAction(id) {
  const token = await getMyToken();
  if (!token) {
    throw Error('login first')
  }
  return  await DeleteFav({ productId: id, token: token });
}