import prisma from "../../../../prisma/client";
import { verifyMiddleware } from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    switch (req.method) {
      case "GET":
        try {
          const userId = Number(req.query.userId); // Obtener el userId de los query parameters

          // Si userId existe, filtrar los pedidos por ese userId, si no, obtener todos los pedidos
          const orders = await prisma.order.findMany({
            where: userId ? { userId } : undefined,
            include: {
              user: true, // <- Aquí estás incluyendo la relación user.
              orderDetails: {
                include: {
                  products: true,
                },
              },
            },
          });
          res.status(200).json(orders);
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error fetching orders", error: error.message });
        }
        break;
      case "DELETE":
        try {
          if (req.query.id) {
            // Eliminar orden específica por ID
            const orderId = Number(req.query.id);
            await prisma.orderDetail.deleteMany({
              where: { orderId: orderId },
            });
            await prisma.order.delete({
              where: { id: orderId },
            });
            res.status(200).json({
              message: `Order with id ${orderId} deleted successfully.`,
            });
          } else {
            // Eliminar todas las órdenes
            await prisma.orderDetail.deleteMany();
            await prisma.order.deleteMany();
            res
              .status(200)
              .json({ message: "All orders deleted successfully." });
          }
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error deleting orders", error: error.message });
        }
        break;
      case "PUT":
        console.log("Recibiendo solicitud PUT con data:", req.body);

        try {
          const { orderId, status, deliveryDate } = req.body;

          const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status, deliveryDate },
          });

          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json({
            message: "Error updating order status",
            error: error.message,
          });
        }
        break;
    }
  }
  res.status(401).json({ message: "unauthorized" });
}

export default verifyMiddleware(handler);
