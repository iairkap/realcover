import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handleRequest = async (req, res) => {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code },
      });

      if (!coupon || coupon.used) {
        return res.json({ isValid: false });
      }

      await prisma.coupon.update({
        where: { id: coupon.id },
        data: { used: true },
      });

      return res.json({ isValid: true, discountValue: coupon.discountValue });
    } catch (error) {
      console.error("Error al validar el cupón:", error);
      res.status(500).json({ error: "Error al validar el cupón." });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};

export default handleRequest;
