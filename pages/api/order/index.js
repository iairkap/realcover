import prisma from "../../../prisma/client";
import verifyMiddleware from "../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  const { total, status, products, discountCode } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: verifyMethod,
          },
        });

        const userId = user.id;
        let discount = 0;

        if (discountCode) {
          const discountCodeDB = await prisma.discount.findUnique({
            where: {
              code: discountCode,
            },
          });
          if (discountCodeDB.active) {
            discount = (discountCodeDB.discount / 100) * total;
          } else {
            res.status(400).json({ message: "Discount code is not active" });
            return;
          }
        }

        const order = await prisma.order.create({
          data: {
            total: total - discount,
            status: status,
            userId: userId,
            discountCode: discountCode ? discountCode : null,
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

        res.status(200).json({ message: "Order created" });
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
    case "PUT":
      console.log("Recibiendo solicitud PUT con data:", req.body);

      try {
        const { orderId, status } = req.body;

        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: { status },
        });

        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(500).json({
          message: "Error updating order status",
          error: error.message,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default verifyMiddleware(handler);
