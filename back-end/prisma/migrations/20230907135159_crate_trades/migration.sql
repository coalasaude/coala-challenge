/*
  Warnings:

  - Added the required column `updatedAt` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Trades" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookId" TEXT,

    CONSTRAINT "Trades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
