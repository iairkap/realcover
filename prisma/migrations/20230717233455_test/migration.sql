-- CreateEnum
CREATE TYPE "SizeNotebook" AS ENUM ('Size10', 'Size12', 'Size14', 'Size156', 'Size17');

-- CreateEnum
CREATE TYPE "SizeTablet" AS ENUM ('Size7', 'Size8', 'Size9', 'Size10');

-- CreateEnum
CREATE TYPE "SizePortafolios" AS ENUM ('Size14', 'Size156');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "phone" TEXT,
    "provider" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NeopreneCover" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageName" TEXT DEFAULT '',

    CONSTRAINT "NeopreneCover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maletines" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageName" TEXT DEFAULT '',

    CONSTRAINT "Maletines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaletinesSize" (
    "maletinesId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "MaletinesSize_pkey" PRIMARY KEY ("maletinesId","sizeId")
);

-- CreateTable
CREATE TABLE "NeopreneCoverSize" (
    "neopreneCoverId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "NeopreneCoverSize_pkey" PRIMARY KEY ("neopreneCoverId","sizeId")
);

-- CreateTable
CREATE TABLE "FullColorCoverSize" (
    "fullColorCoverId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "FullColorCoverSize_pkey" PRIMARY KEY ("fullColorCoverId","sizeId")
);

-- CreateTable
CREATE TABLE "maletinesFUllColor" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageName" TEXT DEFAULT '',

    CONSTRAINT "maletinesFUllColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletCover" (
    "id" SERIAL NOT NULL,
    "size" "SizeTablet" NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tabletCover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cubrevalijas" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageName" TEXT DEFAULT '',

    CONSTRAINT "cubrevalijas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sizeb" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Sizeb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CubreValijaSize" (
    "id" SERIAL NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "cubrevalijasId" INTEGER NOT NULL,

    CONSTRAINT "CubreValijaSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolBags" (
    "id" SERIAL NOT NULL,
    "size" "SizeNotebook" NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "schoolBags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portafolios" (
    "id" SERIAL NOT NULL,
    "size" "SizePortafolios" NOT NULL,
    "picture" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "portafolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "neopreneCoverId" INTEGER,
    "tabletCoverId" INTEGER,
    "maletinesId" INTEGER,
    "maletinesFUllColorId" INTEGER,
    "schoolBagsId" INTEGER,
    "portafoliosId" INTEGER,
    "cubrevalijasId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "MaletinesSize" ADD CONSTRAINT "MaletinesSize_maletinesId_fkey" FOREIGN KEY ("maletinesId") REFERENCES "Maletines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaletinesSize" ADD CONSTRAINT "MaletinesSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeopreneCoverSize" ADD CONSTRAINT "NeopreneCoverSize_neopreneCoverId_fkey" FOREIGN KEY ("neopreneCoverId") REFERENCES "NeopreneCover"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeopreneCoverSize" ADD CONSTRAINT "NeopreneCoverSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullColorCoverSize" ADD CONSTRAINT "FullColorCoverSize_fullColorCoverId_fkey" FOREIGN KEY ("fullColorCoverId") REFERENCES "maletinesFUllColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullColorCoverSize" ADD CONSTRAINT "FullColorCoverSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CubreValijaSize" ADD CONSTRAINT "CubreValijaSize_cubrevalijasId_fkey" FOREIGN KEY ("cubrevalijasId") REFERENCES "cubrevalijas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CubreValijaSize" ADD CONSTRAINT "CubreValijaSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizeb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_cubrevalijasId_fkey" FOREIGN KEY ("cubrevalijasId") REFERENCES "cubrevalijas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_maletinesFUllColorId_fkey" FOREIGN KEY ("maletinesFUllColorId") REFERENCES "maletinesFUllColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_maletinesId_fkey" FOREIGN KEY ("maletinesId") REFERENCES "Maletines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_neopreneCoverId_fkey" FOREIGN KEY ("neopreneCoverId") REFERENCES "NeopreneCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_portafoliosId_fkey" FOREIGN KEY ("portafoliosId") REFERENCES "portafolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_schoolBagsId_fkey" FOREIGN KEY ("schoolBagsId") REFERENCES "schoolBags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_tabletCoverId_fkey" FOREIGN KEY ("tabletCoverId") REFERENCES "tabletCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;
