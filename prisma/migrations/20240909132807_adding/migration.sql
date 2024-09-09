-- CreateEnum
CREATE TYPE "courseCategory" AS ENUM ('WebDevelopment', 'Backend', 'Frontend', 'AI', 'DataScience');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" "courseCategory"[] DEFAULT ARRAY[]::"courseCategory"[];
