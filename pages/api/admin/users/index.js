import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    if (req.method === "GET") {
      const users = await prisma.user.findMany({
        include: {
          orders: true,
        },
      });
      users.forEach((user) => (user.password = undefined));
      users.forEach((user) => (user.ordersNumber = user.orders.length));
      res.status(200).json(users);
    } else if (req.method === "DELETE") {
      const email = req.query.email;

      if (!email) {
        res.status(400).json({ message: "User ID required" });
      }

      try {
        const user = await prisma.user.delete({
          where: { email: email },
        });

        user.password = undefined;
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
}

export default verifyMiddleware(handler);
