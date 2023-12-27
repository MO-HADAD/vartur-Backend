/*
  Warnings:

  - You are about to alter the column `picture` on the `category` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `picture` on the `product` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `picture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `picture` VARCHAR(191) NULL;
