-- AlterTable
ALTER TABLE "Trades" ADD COLUMN     "usersId" TEXT;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
