-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NULL DEFAULT true,
    `isVerified` BOOLEAN NULL DEFAULT false,
    `tokenAccount` VARCHAR(191) NOT NULL,
    `tokenResetPassword` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employed` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `yearBirth` DATETIME(3) NOT NULL,
    `managerId` VARCHAR(191) NULL,
    `isManager` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('DEVELOPER', 'MANAGER') NOT NULL,

    UNIQUE INDEX `Employed_email_key`(`email`),
    UNIQUE INDEX `Employed_managerId_key`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url_repository` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `clientId` INTEGER NOT NULL,
    `managerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Project_url_repository_key`(`url_repository`),
    UNIQUE INDEX `Project_clientId_key`(`clientId`),
    UNIQUE INDEX `Project_managerId_key`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `status` ENUM('TO_BE_DONE', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TO_BE_DONE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TasksEmployee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignedId` VARCHAR(191) NOT NULL,
    `receivedId` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TasksEmployee_assignedId_key`(`assignedId`),
    UNIQUE INDEX `TasksEmployee_receivedId_key`(`receivedId`),
    UNIQUE INDEX `TasksEmployee_taskId_key`(`taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_employeeOnProjects` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_employeeOnProjects_AB_unique`(`A`, `B`),
    INDEX `_employeeOnProjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employed` ADD CONSTRAINT `Employed_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TasksEmployee` ADD CONSTRAINT `TasksEmployee_assignedId_fkey` FOREIGN KEY (`assignedId`) REFERENCES `Employed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TasksEmployee` ADD CONSTRAINT `TasksEmployee_receivedId_fkey` FOREIGN KEY (`receivedId`) REFERENCES `Employed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TasksEmployee` ADD CONSTRAINT `TasksEmployee_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_employeeOnProjects` ADD CONSTRAINT `_employeeOnProjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employed`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_employeeOnProjects` ADD CONSTRAINT `_employeeOnProjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
