/*
  Warnings:

  - You are about to drop the column `pickups` on the `guitars` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guitars" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "is_electric" BOOLEAN NOT NULL DEFAULT true,
    "scale" DECIMAL NOT NULL DEFAULT 0.00,
    "cost" DECIMAL NOT NULL DEFAULT 0.00,
    "image_filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_guitars" ("body", "brand", "color", "cost", "createdAt", "description", "image_filename", "model", "product_id", "scale", "updatedAt") SELECT "body", "brand", "color", "cost", "createdAt", "description", "image_filename", "model", "product_id", "scale", "updatedAt" FROM "guitars";
DROP TABLE "guitars";
ALTER TABLE "new_guitars" RENAME TO "guitars";
CREATE UNIQUE INDEX "guitars_brand_key" ON "guitars"("brand");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
