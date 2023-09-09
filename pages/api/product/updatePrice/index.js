import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productType, newPrice } = req.body;

    if (!productType || !newPrice) {
      return res.status(400).json({
        message: "productType and newPrice are required in the request body.",
      });
    }

    try {
      const updatedProducts = await prisma.product.updateMany({
        where: { productType: productType },
        data: { price: newPrice },
      });

      if (updatedProducts.count > 0) {
        res.status(200).send({ message: "Price updated successfully" });
      } else {
        res
          .status(404)
          .send({ message: "No products found with the given productType" });
      }
    } catch (error) {
      console.error("Error in updating:", error);
      res.status(500).json({
        message: "Error updating product price",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Only POST method is allowed." });
  }
}
