/* "use client";

import axios from "axios";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const accessToken =
    "APP_USR-8934327129048544-081922-7699e9b5a8facf01ad88145366ef7eaf-301633663"; // Reemplaza con el token obtenido en el paso 2

  try {
    const response = await axios.get(
      "https://articulo.mercadolibre.com.ar/MLA-835897324-fundas-cubre-valijas-disenos-surtidos-todos-los-tamanos-_JM#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-pdp-boos&reco_client=home_navigation-recommendations&reco_item_pos=0&reco_backend_type=function&reco_id=1f838853-2211-4359-af8b-b0e90b1f6531",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const reviews = response.data.reviews;

    // Guardar reviews en un archivo JSON
    fs.writeFileSync(
      path.join(process.cwd(), "reviews.json"),
      JSON.stringify(reviews, null, 2)
    );

    res.status(200).json({ message: "Reviews guardados correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
}
 */
