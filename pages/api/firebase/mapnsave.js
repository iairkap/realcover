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

  for (const file of files2) {
    const url = await getDownloadURL(file);

    const existingProduct = products.find(
      (product) => product.name === extractImageNameFromURL(url)
    );

    if (existingProduct) {
      existingProduct.picture.push(url);
    } else {
      console.log('Todo salio mal pa');
    }
  }

  const productsCreated = await prisma.product.createMany({
    data: products,
  });
}

export default mapAndSaveImages;
