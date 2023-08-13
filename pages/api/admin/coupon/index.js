import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const coupons = await prisma.coupon.findMany();
        res.status(200).json(coupons);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los cupones." });
      }
      break;

    case "POST":
      // Si se envía un array, se asume que es una creación en bulk.
      if (Array.isArray(req.body)) {
        try {
          const couponsData = req.body;
          await prisma.coupon.createMany({ data: couponsData });
          res.status(201).json({
            message: `${couponsData.length} cupones creados con éxito.`,
          });
        } catch (error) {
          res
            .status(500)
            .json({ error: "Error al crear los cupones en bulk." });
        }
      } else {
        try {
          const newCoupon = req.body;
          const createdCoupon = await prisma.coupon.create({ data: newCoupon });
          res.status(201).json(createdCoupon);
        } catch (error) {
          res.status(500).json({ error: "Error al crear el cupón." });
        }
      }
      break;
    case "DELETE":
      try {
        await prisma.coupon.deleteMany(); // Elimina todos los cupones.
        res
          .status(200)
          .json({ message: "Todos los cupones han sido eliminados." });
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar todos los cupones." });
      }
      break;

    default:
      res.status(405).end(); // Método no permitido.
      break;
  }
}
