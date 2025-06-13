/*
  Warnings:

  - A unique constraint covering the columns `[linearIssueId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "linearIssueId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Request_linearIssueId_key" ON "Request"("linearIssueId");
