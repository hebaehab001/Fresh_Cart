"use server"
import UpdateLoggedUserPassword from "@/APIs/UpdateLoggedUserPassword";
import { getMyToken } from "@/utilities/token"

export async function updateLoggedUserPassword(data) {
    const token = await getMyToken();
    console.log(token);

    if (!token) {
        throw Error('login first')
    }
    return await UpdateLoggedUserPassword({ token: token, data: data });
}