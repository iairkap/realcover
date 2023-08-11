import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
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
        res.status(400).json({ message: "User ID required" });
      }

      try {
        const user = await prisma.user.delete({
          where: { id: Number(userId) },
        });

        user.password = undefined;
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
      }
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
}

export default verifyMiddleware(handler);
