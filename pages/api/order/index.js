import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { userId, total, status, products } = req.body;

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
        res
          .status(500)
          .json({ message: "Error creating one order", error: error.message });
      }
      break;

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
          res.status(200).json({ message: "All orders deleted successfully." });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error deleting orders", error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
