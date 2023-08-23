import prisma from "../../../prisma/client";
import verifyMiddleware from "../jwt-session/verifyMiddleware";

const handler = async (req, res, verifyMethod) => {
  // Si verifyMethod es el email, usamos ese email para obtener el userId
  const user = await prisma.user.findUnique({
    where: {
      email: verifyMethod,
    },
    select: {
      id: true, // Sólo seleccionamos el id para optimizar la consulta
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userId = user.id;

  switch (req.method) {
    case "GET":
      try {
        const coupons = await prisma.coupon.findMany({
          where: { userId },
          include: {
            user: true,
          },
        });

        res.status(200).json(coupons);
      } catch (error) {
        res.status(500).json({
          message: "Error fetching coupons",
          error: error.message,
        });
      }
      break;

    default:
      res.status(405).end(); // Método no permitido
      break;
  }
};

export default verifyMiddleware(handler);
