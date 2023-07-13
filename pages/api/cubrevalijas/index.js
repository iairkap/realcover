/* 
model cubrevalijas { 
    id               Int               @id @default(autoincrement())
    cubreValijaSize  CubreValijaSize[]
    picture          String
    price            Float
    orderDetails     OrderDetail[]
  }
  
  model CubreValijaSize {
    id           Int           @id @default(autoincrement())
    size         String
    cubrevalijas cubrevalijas[] 
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

const price = 5890;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const imageFolderRef = ref(storage, "CubreValijas");
      const filesSnapshot = await listAll(imageFolderRef);
      const files = filesSnapshot.items;

      const sizeIds = await prisma.sizeb.findMany({
        select: { id: true },
        where: {
          size: {
            in: ["Small", "Medium", "Large"],
          },
        },
      });

      const cubrevalijasPromises = files.map(async (file) => {
        const url = await getDownloadURL(file);

        const cubrevalija = await prisma.cubrevalijas.create({
          data: {
            picture: url,
            price: price,
          },
          select: { id: true },
        });

        const cubrevalijaSizePromises = sizeIds.map((sizeId) => {
          return prisma.cubreValijaSize.create({
            data: {
              cubrevalijasId: cubrevalija.id,
              sizeId: sizeId.id,
            },
          });
        });

        await Promise.all(cubrevalijaSizePromises);
      });

      await Promise.all(cubrevalijasPromises);

      res
        .status(200)
        .json({ message: "Las cubrevalijas han sido creadas exitosamente." });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al crear las cubrevalijas: " + error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      const cubrevalijas = await prisma.cubrevalijas.findMany({
        include: {
          cubreValijaSize: {
            select: {
              size: true,
            },
          },
        },
      });

      res.status(200).json(cubrevalijas);
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al obtener las cubrevalijas: " + error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      // First, delete the CubreValijaSize entries
      await prisma.cubreValijaSize.deleteMany({});

      // Then, delete the cubrevalijas
      await prisma.cubrevalijas.deleteMany({});

      res.status(200).json({
        message: "Las cubrevalijas han sido eliminadas exitosamente.",
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al eliminar las cubrevalijas: " + error.message,
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const sizeIds = await prisma.Sizeb.findMany({
        select: { id: true },
      }); // Change this line according to your model naming in the Prisma schema

      const cubrevalijasList = await prisma.cubrevalijas.findMany();

      await pMap(
        cubrevalijasList,
        async (cubrevalija) => {
          const imageName = extractImageNameFromURL(cubrevalija.picture);

          await prisma.cubrevalijas.update({
            where: { id: cubrevalija.id },
            data: { imageName: imageName },
          });

          return pMap(
            sizeIds,
            async (sizeId) => {
              const existingCubrevalijaSize = await prisma.cubreValijaSize.findFirst(
                {
                  where: {
                    cubrevalijasId: cubrevalija.id,
                    sizeId: sizeId.id,
                  },
                }
              );
              if (!existingCubrevalijaSize) {
                return prisma.cubreValijaSize.create({
                  data: {
                    cubrevalijasId: cubrevalija.id,
                    sizeId: sizeId.id,
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
        message: "Las cubrevalijas han sido actualizadas exitosamente.",
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Ha ocurrido un error al actualizar las cubrevalijas: " +
          error.message,
      });
    }
  }
}
