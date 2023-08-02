import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(product);
  } else if (method === "PUT") {
    const {
      name,
      picture,
      price,
      colors,
      productType,
      description,
      sizeNotebook,
      sizeTablet,
      sizePortafolios,
    } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        picture,
        price,
        colors,
        productType,
        description,
        sizeNotebook,
        sizeTablet,
        sizePortafolios,
      },
    });
    res.status(200).json(product);
  } else if (method === "DELETE") {
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(product);
  } else {
    res.status(405).json({ message: "Not supported" });
  }
}
