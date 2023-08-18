import { getSession, signOut } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    signOut({ callbackUrl: "/" }); // Redirige al inicio después de cerrar sesión
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
}
