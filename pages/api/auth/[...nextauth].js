import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { postUserRegistration } from "../utils/postUserRegistration"; // Importa la función

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
  events: {
    async signIn(message) {
      console.log("Event signIn triggered", message);
      postUserRegistration(message);
    },
  },
});
