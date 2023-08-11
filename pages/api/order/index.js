import prisma from "../../../prisma/client";
import verifyMiddleware from "../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  const { total, status, products, discountCode } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: verifyMethod,
          },
        });

        const userId = user.id;
        let discount = 0;

        if (discountCode) {
          const discountCodeDB = await prisma.discount.findUnique({
            where: {
              code: discountCode,
            },
          });
          if (discountCodeDB.active) {
            discount = (discountCodeDB.discount / 100) * total;
          } else {
            res.status(400).json({ message: "Discount code is not active" });
            return;
          }
        }

        const order = await prisma.order.create({
          data: {
            total: total - discount,
            status: status,
            userId: userId,
            discountCode: discountCode ? discountCode : null,
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

        res.status(200).json({ message: "Order created" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating one order", error: error.message });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default verifyMiddleware(handler);
