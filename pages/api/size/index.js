import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient();
      const sizes = await prisma.size.findMany({
        select: {
          id: true,
          size: true,
        },
      });
      res.status(200).json(sizes);
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al obtener los tamaños: " + error.message,
      });
    }
  }
}
