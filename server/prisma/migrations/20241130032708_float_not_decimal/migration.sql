/*
  Warnings:

  - You are about to alter the column `cost` on the `guitars` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `scale` on the `guitars` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guitars" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "is_electric" BOOLEAN NOT NULL DEFAULT true,
    "scale" REAL NOT NULL DEFAULT 0.00,
    "cost" REAL NOT NULL DEFAULT 0.00,
    "image_filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_guitars" ("body", "brand", "color", "cost", "createdAt", "description", "image_filename", "is_electric", "model", "product_id", "scale", "updatedAt", "year") SELECT "body", "brand", "color", "cost", "createdAt", "description", "image_filename", "is_electric", "model", "product_id", "scale", "updatedAt", "year" FROM "guitars";
DROP TABLE "guitars";
ALTER TABLE "new_guitars" RENAME TO "guitars";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
