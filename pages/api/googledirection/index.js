import axios from "axios";

export default async function handler(req, res) {
  const apiKey = "AIzaSyCcb74pgijfKaHBxDNqOBGfI_76Ft3722Q";
  const { address, placeId } = req.query;

  if (address) {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        {
          params: {
            input: address,
            key: apiKey,
          },
        }
      );

      const responseData = response.data;

      const mapped = responseData.predictions.map((item) => {
        return {
          description: item.description,
          place_id: item.place_id,
        };
      });

      res.status(200).json(mapped);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (placeId) {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: placeId,
            key: apiKey,
          },
        }
      );

      const responseData = response.data.result.address_components;
      const mappedComponents = responseData.map((item) => {
        return {
          long_name: item.long_name,
          short_name: item.short_name,
          types: item.types,
        };
      });

      res.status(200).json(mappedComponents);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
