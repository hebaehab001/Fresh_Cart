'use server'
import getUserFav from "@/APIs/GetUserFav";
import { getMyToken } from "@/utilities/token"

export async function getUserFavAction() {
  const token = await getMyToken();
  if (!token) {
    return null
  }
  return  await getUserFav({ token: token });
}
