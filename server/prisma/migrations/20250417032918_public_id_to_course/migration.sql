/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "publicId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Course_publicId_key" ON "Course"("publicId");
