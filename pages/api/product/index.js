import prisma from "../../../prisma/client";
import mapAndSaveImages from "../firebase/mapnsave";

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
      productType,
      description,
      sizes,
      one,
    } = req.body;
    if (one) {
      try {
        const product = await prisma.product.create({
          data: {
            name,
            picture,
            price,
            productType,
            description,
            sizes,
          },
        });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: "Error creating one product" });
      }
    } else {
      try {
        const checklength = await prisma.product.findMany();

        /*    const bolsillo = await mapAndSaveImages(
          "ConBolsillo",
          "CON_BOLSILLO",
          ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
          3290
        );
        const valijas = await mapAndSaveImages(
          "CubreValijas",
          "CUBRE_VALIJAS",
          ["S", "M", "L"],
          6290
        );
        const maletinesfc = await mapAndSaveImages(
          "FullColor",
          "MALETINES_FULL_COLOR",
          ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
          2990
        ); */
        /*       const fundas = await mapAndSaveImages(
          "Fundas",
          "NEOPRENE_COVER",
          ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
          3290
        ); */
        /*      const portfolios = await mapAndSaveImages(
          "Portafolio",
          "PORTAFOLIOS",
          ["14_1", "15_6"],
          5990
        ); */
        const tablet = await mapAndSaveImages(
          "Tablets",
          "TABLET_COVER",
          ["Size7", "Size8", "Size9", "Size10"],
          3290
        );
        const maletines = await mapAndSaveImages(
          "Valijas",
          "MALETINES",
          ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
          3290
        );

        res.status(200).json({ message: "Products created" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating many products", error: error });
      }
    }
  } else if (method === "DELETE") {
    try {
      await prisma.product.deleteMany(); // Esto eliminará todos los productos
      res.status(200).json({ message: "All products deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting all products", error: error });
    }
  } else {
    res.status(405).json({ message: "We only support POST, GET, and DELETE" });
  }
}
