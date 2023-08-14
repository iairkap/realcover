import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const coupons = await prisma.coupon.findMany({
          include: {
            user: true,
          },
        });
        res.status(200).json(coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        res.status(500).json({ error: "Error al obtener los cupones." });
      }
      break;
    case "POST":
      try {
        console.log("Received request to create coupon with data:", req.body);
        const newCoupon = {
          ...req.body,
          userId: req.body.userId, // Use userId from the request body directly
        };

        const createdCoupon = await prisma.coupon.create({ data: newCoupon });

        console.log("Successfully created coupon:", createdCoupon);
        res.status(201).json(createdCoupon);
      } catch (error) {
        console.error("Error creating coupon:", error);
        res.status(500).json({ error: "Error al crear el cupón." });
      }
      break;

    case "DELETE":
      try {
        await prisma.coupon.deleteMany();
        res
          .status(200)
          .json({ message: "Todos los cupones han sido eliminados." });
      } catch (error) {
        console.error("Error deleting all coupons:", error);
        res.status(500).json({ error: "Error al eliminar todos los cupones." });
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
