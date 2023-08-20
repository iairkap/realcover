/* {
    "access_token": "APP_USR-8934327129048544-081922-7699e9b5a8facf01ad88145366ef7eaf-301633663",
    "token_type": "Bearer",
    "expires_in": 21600,
    "scope": "read",
    "user_id": 301633663
  } */

import axios from "axios";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const accessToken =
    "APP_USR-8934327129048544-081923-c1476ffe1c404000014237297da87118-301633663"; // Reemplaza con el token obtenido en el paso 2
  const itemID = "MLA-835897324";

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/reviews/item/${itemID}`,
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
    console.error(error); // Imprime el error completo para depuración
    res
      .status(500)
      .json({ error: "Error al obtener las reseñas", details: error.message });
  }
}
