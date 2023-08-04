import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const orders = await prisma.order.findMany({
          include: { orderDetails: true },
        });
        return res.json(orders);

      case "POST":
        const newOrder = req.body;

        const orderDetails = newOrder.orderDetails.map((detail) => ({
          create: detail,
        }));

        const createdOrder = await prisma.order.create({
          data: {
            ...newOrder,
            orderDetails: orderDetails,
          },
          include: {
            orderDetails: true,
          },
        });
        return res.status(201).json(createdOrder);

      case "PUT":
        const updatedOrder = req.body;
        const orderId = req.query.id;
        const order = await prisma.order.update({
          where: { id: parseInt(orderId) },
          data: updatedOrder,
        });
        return res.json(order);

      case "DELETE":
        const idToDelete = req.query.id;
        const deletedOrder = await prisma.order.delete({
          where: { id: parseInt(idToDelete) },
        });
        return res.json(deletedOrder);

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request", error);
    res
      .status(500)
      .json({ error: "Error handling request, please try again later." });
  }
}
