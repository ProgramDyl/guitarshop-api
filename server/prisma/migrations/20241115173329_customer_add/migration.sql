-- CreateTable
CREATE TABLE "customer" (
    "customer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");
