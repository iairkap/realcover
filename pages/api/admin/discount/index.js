import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";
import generarCodigoDescuento from "./randomDiscount";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    const { onlyActive } = req.query;
    switch (req.method) {
      case "GET":
        try {
          const discounts = await prisma.discount.findMany({
            where: onlyActive ? { active: true } : undefined,
            include: {
              orders: true,
            },
            orderBy: { id: "asc" },
          });
          return res.status(200).json(discounts);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      case "POST":
        try {
          const { discount, active } = req.body;
          const code = generarCodigoDescuento();
          const newDiscount = await prisma.discount.create({
            data: {
              code: code,
              discount,
              active,
            },
          });
          return res.status(200).json(newDiscount);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      case "PUT":
        try {
          const { codeToDelete } = req.body;
          const discountToUpdate = await prisma.discount.update({
            where: { code: codeToDelete },
            data: {
              active: false,
              deletedAt: new Date(),
            },
          });
          return res.status(200).json({ message: "Discount deleted" });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

export default verifyMiddleware(handler);
