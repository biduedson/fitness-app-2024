/*
  Warnings:

  - The `paymentStatus` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "paymentStatus";

-- DropEnum
DROP TYPE "studentStatus";
