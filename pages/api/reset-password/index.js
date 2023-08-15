/* import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { token } = req.cookies;

  if (req.method === "POST") {
    const { password } = req.body;

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).send("Enlace inválido o expirado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: decodedToken.id },
      data: { password: hashedPassword },
    });

    res.send("Tu contraseña ha sido restablecida.");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
 */
