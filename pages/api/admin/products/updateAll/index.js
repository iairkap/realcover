import prisma from "../../../../../prisma/client";
import verifyMiddleware from "../../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  if (verifyMethod === process.env.ADMIN_EMAIL) {
    if (req.method === "PUT") {
      const {
        name,
        picture,
        price,
        productType,
        description,
        sizes,
      } = req.body;
      const { id } = req.query;
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
          picture,
          price,
          productType,
          description,
          sizes,
        },
      });
      res.json(product);
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default verifyMiddleware(handler);
