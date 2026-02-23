'use server'
import PostFav from "@/APIs/PostFav";
import { getMyToken } from "@/utilities/token"

export async function AddToFavAction(id) {
    const token = await getMyToken();
    return await PostFav({ productId: id, token: token });
}