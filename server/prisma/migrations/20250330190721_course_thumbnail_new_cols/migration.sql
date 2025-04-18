/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Course` table. All the data in the column will be lost.
  - Added the required column `thumbnailMetadata` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailPublicId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnailMetadata" JSONB NOT NULL,
ADD COLUMN     "thumbnailPublicId" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
