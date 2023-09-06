import {
  storage,
  storage2,
  ref,
  listAll,
  getDownloadURL,
  extractImageNameFromURL,
} from "./firebase.js";
import prisma from "../../../prisma/client.js";

async function mapAndSaveImages(
  folderName,
  folderName2,
  productType,
  productSizes,
  productPrice
) {
  const imageFolderRef = ref(storage, folderName);
  const filesSnapshot = await listAll(imageFolderRef);
  const files = filesSnapshot.items;
  
  const imageFolderRef2 = ref(storage2, folderName2);
  const filesSnapshot2 = await listAll(imageFolderRef2);
  const files2 = filesSnapshot2.items;

  const products = [];

  for (const [i, file] of files.entries()) {
    const url1 = await getDownloadURL(file);
    const url2 = await getDownloadURL(files2[i]); 
    const product = {
      name: extractImageNameFromURL(url1),
      picture: [url1, url2],
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
