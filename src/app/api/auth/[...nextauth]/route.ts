import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!email) return false;

      await addUser({
        id,
        image: image || "",
        name: name || "",
        email,
        username: email.split("@")[0] || name || "",
      });

      return true;
    },
    async session({ session }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...session.user,
          username: session.user.email?.split("@")[0] || "",
        };
      }
  
      return session;
    },
  },
});

export { handler as GET, handler as POST };
