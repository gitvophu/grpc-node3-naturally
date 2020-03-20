-- 1. Tạo db
-- CREATE DATABASE `test_db`;
-- 2. Tạo table
-- USE `test_db`;
-- CREATE TABLE `products`(
-- 	`id` INT(11) AUTO_INCREMENT,
--     `name` VARCHAR(255) CHARACTER SET utf8 NOT NULL,
--     `price` FLOAT NOT NULL DEFAULT 0,
--     PRIMARY KEY(id)
-- )
-- 3 Tạo dữ liệu mẫu
INSERT INTO `products`(`name`,`price`) VALUES ('Sản phẩm demo 1', 1000);
INSERT INTO `products`(`name`,`price`) VALUES ('Sản phẩm demo 2', 1000);
INSERT INTO `products`(`name`,`price`) VALUES ('Sản phẩm demo 3', 1000);

CREATE TABLE `test_db`.`users` (
  `id` INT NOT NULL,
  `name` VARCHAR(64) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `age` INT NOT NULL,
  `email` VARCHAR(64) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `test_db`.`npp` (
  `id` INT NOT NULL,
  `name` VARCHAR(64) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `age` INT NOT NULL,
  `email` VARCHAR(64) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`id`));
