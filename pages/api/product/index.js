import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { productType } = req.query;
  const { page } = req.query;
  const { limit } = req.query;

  switch (method) {
    case "GET":
      const products = await prisma.product.findMany({
        where: {
          productType: productType,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return res.status(200).json(products);

    default:
      return res.status(405).json({ message: "We only support GET" });
  }
}
