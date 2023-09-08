/* import prisma from "../../../prisma/client";
import mapAndSaveImages from "../firebase/mapnsave";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const products = await prisma.product.findMany();
      return res.status(200).json(products);

    default:
      return res.status(405).json({ message: "We only support GET" });
  }
}
 */

import prisma from "../../../prisma/client";
import mapAndSaveImages from "../firebase/mapnsave";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const page = parseInt(req.query.page) || 0;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 12;
      const productType = req.query.productType || null;

      const products = await prisma.product.findMany({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        where: productType ? { productType } : undefined,
      });

      const totalProducts = await prisma.product.count({
        where: productType ? { productType } : undefined,
      });

      return res.status(200).json({ products, totalProducts });

    default:
      return res.status(405).json({ message: "We only support GET" });
  }
}
