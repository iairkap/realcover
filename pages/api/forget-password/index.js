/* import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .send("No existe un usuario con ese correo electrónico.");
    }

    // Crear un token de restablecimiento de contraseña
    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Crear un correo electrónico con el enlace para restablecer la contraseña
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "YOUR_GMAIL_ACCOUNT",
      to: user.email,
      subject: "Restablecimiento de contraseña",
      text: `Para restablecer tu contraseña, haz click en el siguiente enlace: http://localhost:3000/reset-password/${token}`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    res.send(
      "Se ha enviado un correo electrónico con el enlace para restablecer tu contraseña."
    );
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
 */
