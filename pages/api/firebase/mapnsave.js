import {
  // storage,
  storage2,
  ref,
  listAll,
  getDownloadURL,
  extractImageNameFromURL,
} from "./firebase.js";
import prisma from "../../../prisma/client.js";

/*async function mapAndSaveImages(
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

  /*   const urls1 = await Promise.all(files.map((file) => getDownloadURL(file)));

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
  const urls2 = await Promise.all(files2.map((file) => getDownloadURL(file)));

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
 */

export async function mapAndSaveImages(
  folderName,
  productType,
  productSizes,
  productPrice
) {
  // Crear una referencia a la carpeta donde están almacenadas las imágenes en Firebase
  const imageFolderRef2 = ref(storage2, folderName);

  // Obtener una lista de todos los archivos en esa carpeta
  const filesSnapshot2 = await listAll(imageFolderRef2);
  const files2 = filesSnapshot2.items;

  const products = [];

  // Obtener las URLs de descarga para cada archivo
  const urls2 = await Promise.all(files2.map((file) => getDownloadURL(file)));

  // Crear un objeto de producto para cada URL y añadirlo a la lista de productos
  for (let i = 0; i < urls2.length; i++) {
    const url2 = urls2[i];

    // Extraer el nombre de la imagen de la URL
    const name2 = extractImageNameFromURL(url2);

    // Crear un objeto de producto
    const product = {
      name: name2,
      picture: [url2],
      price: productPrice,
      productType: productType,
      sizes: productSizes,
    };

    // Añadir el objeto de producto a la lista de productos
    products.push(product);
  }

  // Crear todos los productos en la base de datos
  try {
    const createdProducts = await prisma.product.createMany({
      data: products,
    });

    // Devolver los productos creados
    return createdProducts;
  } catch (error) {
    console.error("Error creating products:", error);
    throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
}
