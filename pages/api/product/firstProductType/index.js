import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await getFirstProductOfEachType();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching first products",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "We only support GET for this endpoint" });
  }
}

async function getFirstProductOfEachType() {
  const productTypes = [
    "NEOPRENE_COVER",
    "MALETINES",
    "MALETINES_FULL_COLOR",
    "TABLET_COVER",
    "CUBRE_VALIJAS",
    "CON_BOLSILLO",
  ];

  let results = {};

  for (let type of productTypes) {
    const product = await prisma.product.findFirst({
      where: {
        productType: type,
      },
    });

    if (product) {
      results[type] = product;
    } else {
      results[type] = "No product available for this type.";
    }
  }

  return results;
}
