/*
  Warnings:

  - The `picture` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "pictureB" TEXT,
DROP COLUMN "picture",
ADD COLUMN     "picture" TEXT[];
