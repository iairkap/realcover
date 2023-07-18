import { PrismaClient } from "@prisma/client";
import withSession from "../../../src/session";

const prisma = new PrismaClient();

export default withSession(async function(req, res) {
  const { method } = req;

  // Declara la variable user una vez fuera del bloque switch
  let user;

  switch (method) {
    case "GET":
      // Asigna un valor a la variable user
      user = req.session.get("user");
      // Verifica si el usuario está autenticado
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const orders = await prisma.order.findMany({
        where: {
          userId: user.id,
        },
      });
      res.json(orders);
      break;
    case "POST":
      // Asigna un valor a la variable user
      user = req.session.get("user");
      // Verifica si el usuario está autenticado
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { total, status } = req.body; // se debe validar estos datos antes de insertarlos a la base de datos
      const newOrder = await prisma.order.create({
        data: {
          userId: user.id,
          total,
          status,
        },
      });
      res.json(newOrder);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
