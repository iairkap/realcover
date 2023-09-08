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
  productType,
  productSizes,
  productPrice
) {
  const imageFolderRef = ref(storage, folderName);
  const filesSnapshot = await listAll(imageFolderRef);
  const files = filesSnapshot.items;
  
  const imageFolderRef2 = ref(storage2, folderName);
  const filesSnapshot2 = await listAll(imageFolderRef2);
  const files2 = filesSnapshot2.items;

  const products = [];

  const urls1 = await Promise.all(files.map(file => getDownloadURL(file)));
  
  for (let i = 0; i < urls1.length; i++) {
    const url1 = urls1[i];
    const name1 = extractImageNameFromURL(url1);
    const product = {
      name: name1,
      picture: [url1],
      price: productPrice,
      productType: productType,
      sizes: productSizes,
    };
    products.push(product);
  }

  const urls2 = await Promise.all(files2.map(file => getDownloadURL(file)));
  
  for (const product of products) {
    for (const url2 of urls2) {
      const name2 = extractImageNameFromURL(url2);

      if (product.name === name2) {
        product.picture.push(url2);
      }
    }
  }

  const createdProducts = await prisma.product.createMany({
  data: products,
  });
}

export default mapAndSaveImages;
