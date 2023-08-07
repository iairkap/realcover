import prisma from "../../../prisma/client";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  const { token } = req.cookies;
  const { total, status, products } = req.body;
  const session = await getSession({ req });

  let verifyMethod;

  if (session) {
    verifyMethod = session.user.email;
  } else if (token) {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      verifyMethod = email;
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: verifyMethod,
    },
  });

  const userId = user.id;

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
