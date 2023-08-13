import prisma from "../../../prisma/client";
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
