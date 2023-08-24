import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Por favor, envíe el userId para obtener cupones." });
  }

  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        userId: userId,
      },
    });

    res.json(coupons);
  } catch (error) {
    console.error("Error obteniendo cupones:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
