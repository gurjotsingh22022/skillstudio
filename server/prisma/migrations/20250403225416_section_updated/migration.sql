/*
  Warnings:

  - You are about to drop the column `courseDetailId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_courseDetailId_fkey";

-- DropIndex
DROP INDEX "Section_courseDetailId_idx";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "courseDetailId";

-- CreateIndex
CREATE INDEX "Section_id_idx" ON "Section"("id");

-- CreateIndex
CREATE INDEX "Section_courseId_idx" ON "Section"("courseId");
