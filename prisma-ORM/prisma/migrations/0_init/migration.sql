-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NULL,
    `last_name` VARCHAR(30) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(80) NULL,
    `telephone` VARCHAR(20) NULL,

    INDEX `last_name`(`last_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NULL,
    `birth_date` DATE NULL,
    `type_id` INTEGER UNSIGNED NOT NULL,
    `owner_id` INTEGER UNSIGNED NULL,

    INDEX `name`(`name`),
    INDEX `owner_id`(`owner_id`),
    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialties` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NULL,

    INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NULL,

    INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vet_specialties` (
    `vet_id` INTEGER UNSIGNED NOT NULL,
    `specialty_id` INTEGER UNSIGNED NOT NULL,

    INDEX `specialty_id`(`specialty_id`),
    UNIQUE INDEX `vet_id`(`vet_id`, `specialty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vets` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NULL,
    `last_name` VARCHAR(30) NULL,

    INDEX `last_name`(`last_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visits` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `pet_id` INTEGER UNSIGNED NULL,
    `visit_date` DATE NULL,
    `description` VARCHAR(255) NULL,

    INDEX `pet_id`(`pet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `PetsOwnersid` FOREIGN KEY (`owner_id`) REFERENCES `owners`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `petsTypesId` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vet_specialties` ADD CONSTRAINT `SpecialtyVetId` FOREIGN KEY (`vet_id`) REFERENCES `vets`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vet_specialties` ADD CONSTRAINT `SpecialVetId` FOREIGN KEY (`specialty_id`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `VisitsPetsId` FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

