/*
  Warnings:

  - You are about to drop the `Skateboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Skateboard";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "products" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "wheelbase" DECIMAL NOT NULL DEFAULT 0.00,
    "cost" DECIMAL NOT NULL DEFAULT 0.00,
    "image_filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");
