import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { userId, total, status, products } = req.body;

  switch (method) {
    case "POST":
      try {
        const order = await prisma.order.create({
          data: {
            total,
            status,
            userId,
          },
        });

        const orderDetail = products.map((product) => {
          return {
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            size: product.size,
          };
        });
        const orderDetails = await prisma.orderDetail.createMany({
          data: orderDetail,
        });

        res.status(200).json({ order, orderDetails });
      } catch (error) {
        res.status(500).json({ message: "Error creating one order" });
      }
      break;

    case "GET":
      try {
        const orders = await prisma.order.findMany({
          include: {
            orderDetails: {
              include: {
                products: true,
              },
            },
          },
        });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: "Error getting orders" });
      }
      break;

    default:
      break;
  }
}
