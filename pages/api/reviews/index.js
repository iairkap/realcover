import axios from "axios";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const itemId = req.query.itemId;
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${itemId}/reviews`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching reviews from MercadoLibre:", error); // Agregar esta línea
      res.status(500).json({ error: "Error fetching reviews" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
