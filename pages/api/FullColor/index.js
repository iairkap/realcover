/* model maletinesFUllColor {
    id           Int           @id @default(autoincrement())
    size         SizeNotebook
    picture      String
    price        Float
    orderDetails OrderDetail[]
  }
   */

import { PrismaClient } from "@prisma/client";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import pMap from "p-map";

const firebaseConfig = {
  apiKey: "AIzaSyCbJBIAFDUphzN2s8KxvVFM1eQTva4U-LE",
  authDomain: "real-cover.firebaseapp.com",
  projectId: "real-cover",
  storageBucket: "real-cover.appspot.com",
  messagingSenderId: "308908780968",
  appId: "1:308908780968:web:8a3176ab8b84c34acc019d",
  measurementId: "G-RQFL8DH01N",
};

function extractImageNameFromURL(url) {
  let urlParts = url.split("/");
  let imageNameWithExtension = urlParts[urlParts.length - 1].split("?")[0];
  let imageNameParts = imageNameWithExtension.split(".");
  return imageNameParts[0];
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const prisma = new PrismaClient();

const price = 3190;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const imageFolderRef = ref(storage, "FullColor");
      const filesSnapshot = await listAll(imageFolderRef);
      const files = filesSnapshot.items;

      const sizeIds = await prisma.size.findMany({
        select: { id: true },
        where: {
          size: {
            in: ["10", "12", "14", "15.6", "17"],
          },
        },
      });

      const fullColorPromises = files.map(async (file) => {
        const url = await getDownloadURL(file);

        const fullColor = await prisma.maletinesFUllColor.create({
          data: {
            picture: url,
            price: price,
          },
          select: { id: true },
        });

        const coverSizePromises = sizeIds.map((sizeId) => {
          return prisma.coverSize.create({
            data: {
              coverId: fullColor.id,
              sizeId: sizeId.id,
            },
          });
        });

        await Promise.all(coverSizePromises);
      });

      await Promise.all(fullColorPromises);

      res.status(200).json({ message: "Fundas Full Color creadas" });
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al crear las fundas: " + error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      const fullColorCovers = await prisma.maletinesFUllColor.findMany({
        include: {
          sizes: {
            select: {
              size: true,
            },
          },
        },
      });

      res.status(200).json(fullColorCovers);
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al obtener las fundas: " + error.message,
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const sizeIds = [1, 2, 3, 4, 5]; // Los IDs de los tamaños que quieres añadir

      const fullColorCovers = await prisma.maletinesFUllColor.findMany();

      await pMap(
        fullColorCovers,
        async (fullColor) => {
          const imageName = extractImageNameFromURL(fullColor.picture);

          await prisma.maletinesFUllColor.update({
            where: { id: fullColor.id },
            data: { imageName: imageName },
          });

          return pMap(
            sizeIds,
            async (sizeId) => {
              const existingCoverSize = await prisma.fullColorCoverSize.findFirst(
                {
                  where: {
                    fullColorCoverId: fullColor.id,
                    sizeId: sizeId,
                  },
                }
              );

              if (!existingCoverSize) {
                return prisma.fullColorCoverSize.create({
                  data: {
                    fullColorCoverId: fullColor.id,
                    sizeId: sizeId,
                  },
                });
              }
            },
            { concurrency: 5 }
          );
        },
        { concurrency: 5 }
      );

      res.status(200).json({ message: "Fundas Full Color actualizadas" });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al actualizar las fundas: " + error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      // Primero eliminamos todas las relaciones de tamaño asociadas con las fundas Full Color
      await prisma.fullColorCoverSize.deleteMany({});

      // Luego eliminamos todas las fundas Full Color
      await prisma.maletinesFUllColor.deleteMany({});

      res
        .status(200)
        .json({ message: "Todas las Fundas Full Color han sido eliminadas" });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al eliminar las Fundas Full Color: " +
          error.message,
      });
    }
  } else {
    // Envía una respuesta para cualquier otro tipo de solicitud
    res.status(405).json({ message: "Method not allowed" });
  }
}
