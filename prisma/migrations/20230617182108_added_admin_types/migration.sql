/*
  Warnings:

  - Added the required column `type` to the `admin_types` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "admin_type_enum" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR');

-- AlterTable
ALTER TABLE "admin_types" ADD COLUMN     "type" "admin_type_enum" NOT NULL;
