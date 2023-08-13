import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    try {
      switch (req.method) {
        case "GET":
          const orders = await prisma.order.findMany({
            include: {
              user: true,
              orderDetails: true,
              discount: true,
            },
          });
          res.status(200).json(orders);
          break;

        default:
          res.status(405).json({ message: "Method not allowed" });
          break;
      }
    } catch (error) {}
  }
}

export default verifyMiddleware(handler);
