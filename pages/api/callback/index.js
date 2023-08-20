import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({ error: "El código es necesario." });
    }

    try {
      const response = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: process.env.MERCADOLIBRE_APP_ID,
            client_secret: process.env.MERCADOLIBRE_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.MERCADOLIBRE_REDIRECT_URL,
          },
        }
      );

      const accessToken = response.data.access_token;

      // Aquí ya tienes el accessToken. Puedes almacenarlo, usarlo para hacer más llamadas, etc.
      return res.status(200).json({ accessToken });
    } catch (error) {
      console.error(
        "Error al intentar obtener el token:",
        error.response ? error.response.data : error
      );
      return res
        .status(500)
        .json({ error: "Error al obtener el token de acceso." });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido." });
  }
}
