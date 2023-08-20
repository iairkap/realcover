import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API;
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
      //mappear solo lo siguiente route, streetnumber, locality, administrative_area_level_1, postal_code, si no hay el tipo, muestra el nombre del tipo que falta mas "no hay tipo"
      const mappedComponents = responseData.map((item) => {
        const types = item.types;
        const longName = item.long_name;
        let mappedItem = {};

        if (types.includes("route")) {
          mappedItem.route = longName;
        } else if (types.includes("street_number")) {
          mappedItem.street_number = longName;
        } else if (types.includes("locality")) {
          mappedItem.locality = longName;
        } else if (types.includes("administrative_area_level_1")) {
          mappedItem.administrative_area_level_1 = longName;
        } else if (types.includes("postal_code")) {
          mappedItem.postal_code = longName;
        } else {
          mappedItem = null;
        }

        return mappedItem;
      });

      res.status(200).json(mappedComponents);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
