import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD, // Define un password secreto en tu archivo .env
    cookieName: "MYSITE_COOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // Si es producción, solo se enviarán cookies seguras, es decir, solo a través de HTTPS
    },
  });
}
