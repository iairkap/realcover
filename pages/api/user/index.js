import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { name, lastName, email, password, provider } = req.body;

    try {
      const hashedPassword = password && (await hash(password, 10));

      const user = await prisma.user.create({
        data: {
          name,
          lastName,
          email,
          password: hashedPassword,
          provider: provider || "local",
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      console.error(error.stack);
      res.status(500).json({ message: "Error creating user" });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
