import { split } from "postcss/lib/list";
import prisma from "../../../../../prisma/client";
import verifyMiddleware from "../../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    const { productType } = req.query;
    if (req.method === "POST") {
      const { newprice } = req.body;
      const products = await prisma.product.findMany({
        where: {
          productType: productType,
        },
      });
      products.forEach(async (product) => {
        await prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            price: newprice,
          },
        });
      });
      res
        .status(200)
        .json({ message: "Price updated", productType: productType });
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}

export default verifyMiddleware(handler);
