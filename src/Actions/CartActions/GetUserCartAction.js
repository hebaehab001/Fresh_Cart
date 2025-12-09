'use server'

import getUserCart from "@/APIs/GetUserCart";
import { getMyToken } from "@/utilities/token"

export async function getUserCartAction() {
  const token = await getMyToken();
  if (!token) {
    throw Error('login first')
  }
  return  await getUserCart({ token: token });
}
