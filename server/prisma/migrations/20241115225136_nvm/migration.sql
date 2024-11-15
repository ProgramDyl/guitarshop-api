/*
  Warnings:

  - You are about to drop the `skateboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "skateboards";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "guitars" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "pickups" TEXT NOT NULL,
    "scale" DECIMAL NOT NULL DEFAULT 0.00,
    "cost" DECIMAL NOT NULL DEFAULT 0.00,
    "image_filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "guitars_brand_key" ON "guitars"("brand");
