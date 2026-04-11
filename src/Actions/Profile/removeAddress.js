'use server'
import DeleteAddress from "@/APIs/DeleteAddress";
import { getMyToken } from"@/utilities/token"

export async function removeAddress(id) {
  const token = await getMyToken();
  if (!token) {
    throw Error('login first')
  }
  return  await DeleteAddress({ addressId: id, token: token });
}