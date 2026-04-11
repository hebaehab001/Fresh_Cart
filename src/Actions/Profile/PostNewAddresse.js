"use server"
import postNewAddresse from "@/APIs/PostNewAddresse";
import { getMyToken } from "@/utilities/token"

export async function PostNewAddresse(data) {
    const token = await getMyToken();
    if (!token) {
        throw Error('login first')
    }
    return await postNewAddresse({ token: token, data: data });
}
