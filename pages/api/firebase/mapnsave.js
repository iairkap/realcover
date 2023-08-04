import {
  storage,
  ref,
  listAll,
  getDownloadURL,
  extractImageNameFromURL,
} from "./firebase.js";
import prisma from "../../../prisma/client.js";

async function mapAndSaveImages(
  folderName,
  productType,
  productSizes,
  productPrice
) {
  const imageFolderRef = ref(storage, folderName);
  const filesSnapshot = await listAll(imageFolderRef);
  const files = filesSnapshot.items;

  const products = [];

  for (const file of files) {
    const url = await getDownloadURL(file);

    const product = {
      name: extractImageNameFromURL(url),
      picture: url,
      price: productPrice,
      productType: productType,
      sizes: productSizes,
    };

    products.push(product);
  }

  const productsCreated = await prisma.product.createMany({
    data: products,
  });
}

export default mapAndSaveImages;
