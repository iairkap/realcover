import prisma from "../../../../../prisma/client";
import mapAndSaveImages from "../../../firebase/mapnsave";
/* import verifyMiddleware from "../../../jwt-session/verifyMiddleware";
 */
async function handler(req, res, verifyMethod) {
  switch (req.method) {
    case "POST":
      const { name, picture, price, productType, description, sizes, one } =
        req.body;
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
          return res
            .status(200)
            .json({ message: "Product created", product: product });
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error creating one product" });
        }
      } else {
        try {
          const checklength = await prisma.product.findMany();

          // if (checklength.length > 0) {
          //   return res
          //     .status(400)
          //     .json({ message: "Products already created" });
          // }

          const bolsillo = await mapAndSaveImages(
            "ConBolsillo",
            "CON_BOLSILLO",
            ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
            3290
          );
          /*          const valijas = await mapAndSaveImages(
            "CubreValijas",
            "CUBRE_VALIJAS",
            ["S", "M", "L"],
            6290
          ); */
          /*        const maletinesfc = await mapAndSaveImages(
            "FullColor",
            "MALETINES_FULL_COLOR",
            ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
            2990
          ); */
          /*  const fundas = await mapAndSaveImages(
            "Fundas",
            "NEOPRENE_COVER",
            ["Size10", "Size12", "Size14", "Size15_6", "Size17"],
            3290
          ); */
          // const portfolios = await mapAndSaveImages(
          //   "Portafolio",
          //   "PORTAFOLIOs",
          //   ["14_1", "15_6"],
          //   5990
          // );
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

          return res.status(200).json({ message: "Products created" });
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error creating many products", error: error });
        }
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
  return res.status(401).json({ message: "Not authorized" });
}

export default handler;

//
