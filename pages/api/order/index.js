import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { userId, total, status, products } = req.body;
  /* order detail 
  orderId   Int
  productId Int
  quantity  Int
  unitPrice Float
  size      String 
  */
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
            productId: product.id,
            quantity: product.quantity,
            unitPrice: product.price,
            size: product.size,
          };
        });
        const orderDetails = await prisma.orderDetail.createMany({
          data: orderDetail,
        });
        res.status(200).json(orderDetails);
      } catch (error) {
        res.status(500).json({ message: "Error creating order" });
      }
      break;

    default:
      break;
  }
}
