'use server'

import getloggedUserAddresses from "@/APIs/GetloggedUserAddresses";
import { getMyToken } from "@/utilities/token"

export async function GetloggedUserAddresses() {
  const token = await getMyToken();
  if (!token) {
    return null
  }
  return  await getloggedUserAddresses(token);
}