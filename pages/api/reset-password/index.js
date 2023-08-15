import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { hash } from "bcrypt";

// Prisma Client Initialization
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (req.method === "POST") {
    const { password } = req.body;

    if (!token) {
      return res.status(400).send("No token provided.");
    }

    let decodedToken;
    try {
      decodedToken = verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).send("Enlace expirado.");
      }
      return res.status(400).send("Enlace inválido.");
    }

    try {
      const hashedPassword = await hash(password, 10);

      await prisma.user.update({
        where: { id: decodedToken.id },
        data: { password: hashedPassword },
      });

      res.clearCookie("token");
      res.status(200).json({ message: "Tu contraseña ha sido restablecida." });
    } catch (error) {
      console.error("Error updating user password:", error);
      res.status(500).send("Error al restablecer la contraseña.");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
