import { PrismaClient } from "@prisma/client";
import { verifyMiddleware } from "../jwt-session/verifyMiddleware";
const handleRequest = async (req, res) => {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { code } = req.body;

    // Obtener el userId a partir del email verificado
    const currentUser = await prisma.user.findUnique({
      where: { email: req.verifiedEmail },
    });

    if (!currentUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const currentUserId = currentUser.id;

    try {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code },
      });

      if (!coupon) {
        return res.json({ isValid: false });
      }

      if (coupon.used || coupon.userId !== currentUserId) {
        return res.json({ isValid: false });
      }

      await prisma.coupon.update({
        where: { id: coupon.id },
        data: { used: true },
      });

      return res.json({
        isValid: true,
        discountValue: coupon.discountValue,
        couponId: coupon.id,
      });
    } catch (error) {
      console.error("Error al validar el cupón:", error);
      res.status(500).json({ error: "Error al validar el cupón." });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};

export default verifyMiddleware(handleRequest);
