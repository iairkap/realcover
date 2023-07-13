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

const price = 2990;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const imageFolderRef = ref(storage, "Valijas");
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

      const maletinesPromises = files.map(async (file) => {
        const url = await getDownloadURL(file);

        const maletin = await prisma.maletines.create({
          data: {
            picture: url,
            price: price,
          },
          select: { id: true },
        });

        const maletinesSizePromises = sizeIds.map((sizeId) => {
          return prisma.maletinesSize.create({
            data: {
              maletinesId: maletin.id,
              sizeId: sizeId.id,
            },
          });
        });

        await Promise.all(maletinesSizePromises);
      });

      await Promise.all(maletinesPromises);

      res.status(200).json({ message: "maletines fueron creados" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const maletines = await prisma.maletines.findMany({
        include: {
          size: {
            include: {
              size: true,
            },
          },
          orderDetails: {
            select: {
              order: true,
            },
          },
        },
      });

      res.status(200).json(maletines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const sizeIds = [1, 2, 3, 4, 5];

      const maletines = await prisma.maletines.findMany();

      await pMap(
        maletines,
        async (maletin) => {
          const imageName = extractImageNameFromURL(maletin.picture);

          await prisma.maletines.update({
            where: { id: maletin.id },
            data: { imageName: imageName },
          });

          await pMap(
            sizeIds,
            async (sizeId) => {
              const existingMaletinesSize = await prisma.maletinesSize.findFirst(
                {
                  where: {
                    maletinesId: maletin.id,
                    sizeId: sizeId,
                  },
                }
              );

              if (!existingMaletinesSize) {
                await prisma.maletinesSize.create({
                  data: {
                    maletinesId: maletin.id,
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
      res.status(200).json({ message: "maletines fueron actualizados" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.maletinesSize.deleteMany({});
      await prisma.maletines.deleteMany({});

      res.status(200).json({ message: "maletines fueron eliminados" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
