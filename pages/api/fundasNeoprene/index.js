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

const price = 1500.0;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const imageFolderRef = ref(storage, "Fundas");
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

      const coverPromises = files.map(async (file) => {
        const url = await getDownloadURL(file);

        const cover = await prisma.neopreneCover.create({
          data: {
            picture: url,
            price: price,
          },
          select: { id: true },
        });

        const coverSizePromises = sizeIds.map((sizeId) => {
          return prisma.coverSize.create({
            data: {
              coverId: cover.id,
              sizeId: sizeId.id,
            },
          });
        });

        await Promise.all(coverSizePromises);
      });

      await Promise.all(coverPromises);

      res
        .status(200)
        .json({ message: "Las fundas han sido creadas exitosamente." });
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al crear las fundas: " + error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      const covers = await prisma.neopreneCover.findMany({
        include: {
          sizes: {
            select: {
              size: true,
            },
          },
        },
      });

      res.status(200).json(covers);
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al obtener las fundas: " + error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      // First, delete the NeopreneCoverSize entries
      await prisma.neopreneCoverSize.deleteMany({
        where: {
          neopreneCoverId: {
            gte: 1,
            lte: 150,
          },
        },
      });

      // Then, delete the neopreneCovers
      await prisma.neopreneCover.deleteMany({
        where: {
          id: {
            gte: 1,
            lte: 123,
          },
        },
      });

      res
        .status(200)
        .json({ message: "Las fundas han sido eliminadas exitosamente." });
    } catch (error) {
      res.status(500).json({
        error: "Ha ocurrido un error al eliminar las fundas: " + error.message,
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const sizeIds = [1, 2, 3, 4, 5];
      const covers = await prisma.neopreneCover.findMany();

      await pMap(
        covers,
        async (cover) => {
          const imageName = extractImageNameFromURL(cover.picture);

          await prisma.neopreneCover.update({
            where: { id: cover.id },
            data: { imageName: imageName },
          });

          return pMap(
            sizeIds,
            async (sizeId) => {
              const existingCoverSize = await prisma.neopreneCoverSize.findFirst(
                {
                  where: {
                    neopreneCoverId: cover.id,
                    sizeId: sizeId,
                  },
                }
              );
              if (!existingCoverSize) {
                return prisma.neopreneCoverSize.create({
                  data: {
                    neopreneCoverId: cover.id,
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

      res.status(200).json({
        message: "Las fundas de Neopreno han sido actualizadas exitosamente.",
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al actualizar las fundas de Neopreno: " +
          error.message,
      });
    }
  }
}
