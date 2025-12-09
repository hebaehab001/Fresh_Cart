'use server'
import getOrderUser from "@/APIs/GetOrderUser";
import { getMyToken } from "@/utilities/token"
import { jwtDecode } from "jwt-decode";

export async function getUserOrdertAction() {
    const token = await getMyToken();
    if (!token) {
        throw Error('login first')
    }
    const {id} = jwtDecode(token)
    return await getOrderUser({ id: id });
}