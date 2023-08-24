import prisma from "../../../../../prisma/client";

export default async function handle(req, res) {
  if (req.method === "DELETE") {
    try {
      // Elimina todos los productos con ID 477 en adelante
      await prisma.product.deleteMany({
        where: {
          id: {
            gte: 624,
          },
        },
      });

      res.status(200).json({
        message: "Products with ID 477 and above deleted successfully.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting the products", details: error.message });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
