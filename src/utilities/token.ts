'use server'
import { CustomJWT } from "@/types/auth.type";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken():Promise<string | undefined> {
    // get the decode token not the real one
    const jwt =
        (await cookies()).get("next-auth.session-token")?.value ||
        (await cookies()).get("__Secure-next-auth.session-token")?.value;
        
    if (!jwt) return undefined;

    const token = await decode({
        token: jwt,
        secret: process.env.NEXTAUTH_SECRET || "",
    }) as CustomJWT | null;

    return token?.token;
}