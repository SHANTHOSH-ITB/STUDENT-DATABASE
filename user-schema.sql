CREATE TABLE `usermanagement_data1`.`userss` ( `id` INT NOT NULL , `first_name` VARCHAR(50) NOT NULL , `last_name` VARCHAR(50) NOT NULL , `email` VARCHAR(50) NOT NULL , `phone_num` INT(10) NOT NULL , `comments` VARCHAR(50) NOT NULL , `status` INT(20) NOT NULL DEFAULT 'active' ) ENGINE = InnoDB;
ALTER TABLE `userss` CHANGE `language_known` `language_known` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `phone`