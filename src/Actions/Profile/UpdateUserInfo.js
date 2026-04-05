"use server"
import UpdateUserData from "@/APIs/UpdateUserData";
import { getMyToken } from "@/utilities/token"

export async function updateUserInfo(data) {
    const token = await getMyToken();
    console.log(token);

    if (!token) {
        throw Error('login first')
    }
    return await UpdateUserData({ token: token, data: data });
}