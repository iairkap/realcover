import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    const APP_ID = process.env.MERCADOLIBRE_APP_ID;
    const CLIENT_SECRET = process.env.MERCADOLIBRE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.MERCADOLIBRE_REDIRECT_URL;

    try {
      const response = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: APP_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI,
          },
        }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || {});
    }
  } else {
    return res.status(405).end(); // Método no permitido
  }
}
