import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Any object returned will be saved in `user` property of the JWT
        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        console.log("Adding user id to token", user.id);
        token.id = user.id;
      }
      console.log("JWT callback - token", token);
      return token;
    },
    async session(session, token) {
      if (token.id) {
        console.log("Adding user id to session", token.id);
        session.user.id = token.id;
      }
      console.log("Session callback - session", session);
      return session;
    },
  },
});
