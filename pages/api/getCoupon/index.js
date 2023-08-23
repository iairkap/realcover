import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
  // Asegúrate de que el usuario está autenticado
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ error: "Por favor, inicie sesión para obtener cupones." });
  }

  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        userId: session.userId,
      },
    });

    res.json(coupons);
  } catch (error) {
    console.error("Error obteniendo cupones:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
