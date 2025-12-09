import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // login
            authorize: async function (credentials) {
                const res = await fetch(`${process.env.POST_SIGNIN}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const payload = await res.json();
                if (res.ok && payload) {
                    const { id } = jwtDecode(payload.token);
                    return {
                        id: id,
                        user: payload.user,
                        token: payload.token
                    }
                }
                throw new Error(payload.message || "faild to login");
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user?.user;
                token.token = user?.token;
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }