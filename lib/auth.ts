import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@markdavis.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@markdavis.com").trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword";

        const inputEmail = credentials?.email?.trim().toLowerCase();
        const inputPassword = credentials?.password;

        if (
          inputPassword === adminPassword &&
          (inputEmail === adminEmail ||
            inputEmail === "tusharfaruk@gmail.com" ||
            inputEmail === "admin@markdavis.com" ||
            inputEmail === "admin@tusharfaruk@gmail.com")
        ) {
          return {
            id: "1",
            name: "Tushar Faruk (Admin)",
            email: inputEmail || adminEmail,
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "default_development_secret_change_in_prod",
};
