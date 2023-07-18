import { PrismaClient } from "@prisma/client";
import withSession from "../../../../src/session";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
  total: Joi.number().required(),
  status: Joi.string()
    .valid("Created", "Processing", "Delivered")
    .required(),
});

export default withSession(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let user;

  switch (method) {
    case "GET":
      user = req.session.get("user");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
      });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.userId !== user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.json(order);
      break;
    case "PUT":
      user = req.session.get("user");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { error } = schema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: "Bad request", details: error.details });
      }

      const { total, status } = req.body;
      const updatedOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { total, status },
      });
      res.json(updatedOrder);
      break;
    case "DELETE":
      user = req.session.get("user");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const deletedOrder = await prisma.order.delete({
        where: { id: Number(id) },
      });
      res.json(deletedOrder);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
