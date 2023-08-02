import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (method === "POST") {
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
    const product = await prisma.product.create({
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
  } else {
    res.status(405).json({ message: "We only support POST and GET" });
  }
}
