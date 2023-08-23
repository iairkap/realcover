import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (req.method === "GET") {
    const { search, orderBy } = req.query;
    let users;
    let orderArguments = {};

    if (orderBy) {
      switch (orderBy) {
        case "name":
          orderArguments = {
            name: "asc",
          };
          break;
        case "location":
          orderArguments = {
            city: "asc",
          };
          break;
        case "orderDate":
          orderArguments = {
            orders: {
              date: "desc",
            },
          };
          break;
        default:
          break;
      }
    }

    if (search) {
      users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            // Agrega otros campos si los necesitas
          ],
        },
        include: {
          orders: true,
        },
      });
    } else {
      users = await prisma.user.findMany({
        include: {
          orders: true,
        },
        orderBy: orderArguments,
      });
    }

    users.forEach((user) => (user.password = undefined));
    users.forEach((user) => (user.ordersNumber = user.orders.length));
    res.status(200).json(users);
  } else if (req.method === "DELETE") {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: Number(userId) },
        select: { id: true },
      });

      for (let order of orders) {
        await prisma.orderDetail.deleteMany({
          where: { orderId: order.id },
        });
      }
      await prisma.order.deleteMany({
        where: { userId: Number(userId) },
      });

      await prisma.coupon.deleteMany({
        where: { userId: Number(userId) },
      });

      const user = await prisma.user.delete({
        where: { id: Number(userId) },
      });

      user.password = undefined;
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
}

export default handler;
