SET @number_of_clubs = 10000;
SET @number_of_players = 100000;
SET @number_of_equipments = 10000;

-- LARGE DATA UNCOMMENT IF NEEDED
-- SET @number_of_clubs = 100000;
-- SET @number_of_players = 1000000;
-- SET @number_of_equipments = 100000;

DROP DATABASE IF EXISTS `orm`;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema orm
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema orm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `orm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `orm` ;

-- -----------------------------------------------------
-- Table `orm`.`club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orm`.`club` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `created` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `orm`.`equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orm`.`equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `color` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `orm`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orm`.`player` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  `clubId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `clubId` (`clubId` ASC) VISIBLE,
  CONSTRAINT `FK_11ec30ccb365809f1630cf14826`
    FOREIGN KEY (`clubId`)
    REFERENCES `orm`.`club` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `orm`.`playerequipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orm`.`playerequipment` (
  `playerId` INT NOT NULL,
  `equipmentId` INT NOT NULL,
  PRIMARY KEY (`playerId`, `equipmentId`),
  INDEX `IDX_0bcd986e2f69af767a2a5d451f` (`playerId` ASC) VISIBLE,
  INDEX `IDX_19a10be7257a6d5722bb749523` (`equipmentId` ASC) VISIBLE,
  CONSTRAINT `FK_0bcd986e2f69af767a2a5d451f0`
    FOREIGN KEY (`playerId`)
    REFERENCES `orm`.`player` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_19a10be7257a6d5722bb7495239`
    FOREIGN KEY (`equipmentId`)
    REFERENCES `orm`.`equipment` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



DELIMITER $$
CREATE PROCEDURE procedure_orm(parameter varchar(64))
begin
	select * from player where name=parameter;
end$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE generate_data_club()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < @number_of_clubs DO
    INSERT INTO `club` (`name`,`location`,`created`) VALUES (
      CONCAT('club', i),
      CONCAT('club_location_', i),
      1000 + i
    );
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE generate_data_player()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < @number_of_players DO
    INSERT INTO `player` (`name`,`lastname`,`age`, `clubId`) VALUES (
      CONCAT('player_name_', i),
      CONCAT('player_lastname_', i),
      FLOOR( 1 + RAND( ) * 60 ),
      FLOOR( 1 + RAND( ) * 10000 )
    );
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE generate_data_equipment()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < @number_of_equipments DO
    INSERT INTO `equipment` (`name`,`description`,`color`) VALUES (
      CONCAT('equipment_name_', i),
      CONCAT('equipment_description_', i),
      CONCAT('equipment_color_', i)
    );
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE generate_data_playerequipment()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE j INT DEFAULT 1;
  WHILE i < @number_of_players DO
    SET j = FLOOR( 1 + RAND() * @number_of_equipments / 2 );
    WHILE (j < @number_of_equipments) DO
      INSERT INTO `playerequipment` (`playerId`,`equipmentId`) VALUES (
        i,
        j
      );
      SET j = j + FLOOR( 1 + RAND() * @number_of_equipments / 2 );
    END WHILE;
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL generate_data_club();
CALL generate_data_player();
CALL generate_data_equipment();
CALL generate_data_playerequipment();
