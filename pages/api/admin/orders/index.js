import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    switch (req.method) {
      case "GET":
        const orders = await prisma.order.findMany({
          include: {
            user: true,
            orderDetails: true,
            discount: true,
          },
        });
        return res.status(200).json(orders);

      default:
        res.status(404).json({ message: "method not allowed" });
        break;
    }
  }
  res.status(401).json({ message: "unauthorized" });
}

export default verifyMiddleware(handler);
