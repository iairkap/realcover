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
          provider,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      console.error(error.stack);
      res.status(500).json({ message: "Error creating user" });
    }
  } else if (req.method === "GET") {
    const users = await prisma.user.findMany();
    users.forEach((user) => (user.password = undefined));
    res.status(200).json(users);
  } else if (req.method === "DELETE") {
    const userId = req.query.id;

    if (!userId) {
      res.status(400).json({ message: "User ID required" });
    }

    try {
      const user = await prisma.user.delete({
        where: { id: Number(userId) },
      });

      user.password = undefined;
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  } else {
    res.status(405).json({ message: "We only support POST, GET, and DELETE" });
  }
}
