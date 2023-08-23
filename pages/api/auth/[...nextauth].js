import NextAuth from "next-auth";
import { postUserRegistration } from "../utils/postUserRegistration"; // Importa la función
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    //   Providers.Facebook({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //   }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  events: {
    async signIn(message) {
      console.log("Event signIn triggered", message);
      postUserRegistration(message);
    },
    async session(session, user) {
      session.userId = user.id;
      return session;
    },
  },
});
