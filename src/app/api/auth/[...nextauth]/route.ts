import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      // login
      authorize: async (credentials) => {
        const res = await fetch(process.env.POST_SIGNIN, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const payload = await res.json();
        if (res.ok && payload) {
          const { id }: { id: string } = jwtDecode(payload.token);
          return {
            id: id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "faild to login");
        }
      },
    }),
  ],
  //   after login
  callbacks: {
    // client
    async session({ session, token }) {
      session.user = token?.user;
      return session;
    },
    // server
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }
      if (trigger === "update" && session?.name) {
        if (!token.user) token.user = {};
        token.user.name = session.name;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
