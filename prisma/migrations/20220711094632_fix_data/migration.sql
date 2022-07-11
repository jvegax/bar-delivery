/*
  Warnings:

  - You are about to drop the column `icon` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - Added the required column `icono` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orden` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `icon`,
    DROP COLUMN `name`,
    ADD COLUMN `icono` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `date`,
    DROP COLUMN `items`,
    DROP COLUMN `name`,
    ADD COLUMN `fecha` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `orden` JSON NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `precio` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
