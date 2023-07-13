const prisma = require("@prisma/client");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.search
  .expression("folder:Fundas de Notebook/*")
  .sort_by("public_id", "desc")
  .max_results(200)
  .execute()
  .then((result) => {
    const promises = result.resources.map((resource) => {
      return prisma.neopreneCover.create({
        data: {
          size: "Size10", // Por ejemplo, si todas las fundas son de tamaño 10"
          picture: resource.secure_url,
          price: 1200, // reemplaza con la información real del precio
        },
      });
    });

    Promise.all(promises)
      .then((neopreneCovers) => {
        console.log("NeopreneCovers creados:", neopreneCovers);
      })
      .catch((error) => {
        console.error("Error al crear NeopreneCovers:", error);
      });
  })
  .catch((error) => console.error("Error al buscar en Cloudinary:", error));
