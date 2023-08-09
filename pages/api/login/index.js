import prisma from "../../../prisma/client";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { serialize } from "cookie";

export default async function loginHandler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await prisma.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      });
    if (!user) {
      return res.status(400).json({ message: "Login failed" });
    }
    const validate = await compare(password, user.password);
    if (!validate) {
      return res.status(400).json({ message: "Login failed" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        city: user.city,
        localidad: user.localidad,
        postalCode: user.postalCode,
        phone: user.phone,
        shopName: user.shopName,
        cuit: user.cuit,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const serializedCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });
    res.setHeader("Set-Cookie", serializedCookie);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        city: user.city,
        localidad: user.localidad,
        postalCode: user.postalCode,
        phone: user.phone,
        shopName: user.shopName,
        cuit: user.cuit,
      },
    }); // Puedes agregar más campos del usuario si los necesitas
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
