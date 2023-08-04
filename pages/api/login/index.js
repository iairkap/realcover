import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import withSession from "../../../src/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  if (req.method === "GET") {
    const user = req.session.get("user");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else if (req.method === "POST") {
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

    const userToReturn = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastName,
    }; // Definimos el objeto del usuario a devolver

    req.session.set("user", userToReturn); // Lo almacenamos en la sesión
    await req.session.save();

    res.status(200).json({ message: "Login successful", user: userToReturn }); // Y también lo devolvemos en la respuesta
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});
