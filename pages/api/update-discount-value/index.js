import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { discountValue } = req.body;

    try {
      // Intenta encontrar el registro en la tabla de configuraciones.
      let config = await prisma.configuration.findUnique({
        where: { name: "discountValue" },
      });

      if (!config) {
        // Si no existe, crea el registro.
        config = await prisma.configuration.create({
          data: {
            name: "discountValue",
            value: discountValue.toString(),
          },
        });
      } else {
        // Si existe, actualiza el registro.
        config = await prisma.configuration.update({
          where: { name: "discountValue" },
          data: { value: discountValue.toString() },
        });
      }

      res.status(200).json(config);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating discount value" });
    }
  } else {
    res.status(405).json({ message: "We only support PUT" });
  }
}
