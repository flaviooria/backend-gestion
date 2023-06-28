-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_clientId_fkey`;

-- AlterTable
ALTER TABLE `Project` MODIFY `clientId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
