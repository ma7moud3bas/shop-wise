/*
  Warnings:

  - You are about to drop the `admin_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'USER');

-- DropForeignKey
ALTER TABLE "admin_users" DROP CONSTRAINT "admin_users_type_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_role_enum" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "admin_types";

-- DropTable
DROP TABLE "admin_users";

-- DropEnum
DROP TYPE "admin_type_enum";
