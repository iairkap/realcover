import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { userId, cartItems } = req.body;
    console.log(req.body);
    // Verificación básica de los datos recibidos
    if (!userId || !Array.isArray(cartItems)) {
      res.status(400).json({ error: "Invalid request data" });
      return;
    }

    try {
      // Inicia una transacción Prisma
      const order = await prisma.$transaction(async (prisma) => {
        // Crea la orden
        const newOrder = await prisma.order.create({
          data: {
            userId,
            date: new Date(),
            total: cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
            status: "pending",
          },
        });

        // Crea los detalles de la orden
        for (let item of cartItems) {
          const data = {
            orderId: newOrder.id,
            quantity: item.quantity,
            unitPrice: item.price,
          };

          // Verificación adicional de los datos de los items del carrito
          if (!item.type || !item.id || !item.quantity || !item.price) {
            throw new Error("Invalid cart item data");
          }

          switch (item.type) {
            case "neopreneCover":
              data.neopreneCoverId = item.id;
              break;
            case "tabletCover":
              data.tabletCoverId = item.id;
              break;
            case "maletines":
              data.maletinesId = item.id;
              break;
            case "maletinesFUllColor":
              data.maletinesFUllColorId = item.id;
              break;
            case "schoolBags":
              data.schoolBagsId = item.id;
              break;
            case "portafolios":
              data.portafoliosId = item.id;
              break;
            case "cubrevalijas":
              data.cubrevalijasId = item.id;
              break;
            default:
              throw new Error(`Unknown product type: ${item.type}`);
          }

          await prisma.orderDetail.create({ data });
        }

        return newOrder;
      });

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      throw new Error("Invalid cart item data");
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "User ID required." });
      return;
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: parseInt(userId) },
        include: { orderDetail: true },
      });

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving user orders." });
    }
  } else {
    // Maneja cualquier otro método HTTP
    res.status(405).json({ error: "Method not allowed." });
  }
}
