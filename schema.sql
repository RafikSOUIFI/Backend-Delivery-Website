-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Delivery
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Delivery
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Delivery` DEFAULT CHARACTER SET utf8 ;
USE `Delivery` ;

-- -----------------------------------------------------
-- Table `Delivery`.`colis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Delivery`.`colis` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `telephone` INT NOT NULL,
  `gouvernerat` VARCHAR(45) NOT NULL,
  `delegation` VARCHAR(45) NOT NULL,
  `adresse` MEDIUMTEXT NOT NULL,
  `designation` VARCHAR(70) NOT NULL,
  `nombre` INT NOT NULL,
  `prix` INT NOT NULL,
  `commentaire` MEDIUMTEXT NULL,
  `date_d_ajout` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_fournisseur` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'en attente',
  `date_d_enlevement` VARCHAR(70) NULL,
  `date_de_livraison` VARCHAR(70) NULL,
  `date_de_retour` VARCHAR(70) NULL,
  `id_livreur` INT NULL,
  `paye` VARCHAR(45) NOT NULL DEFAULT 'non',
  PRIMARY KEY (`id`))
ENGINE = InnoDB AUTO_INCREMENT = 900000000001;

-- -----------------------------------------------------
-- Table `Delivery`.`utilisateurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Delivery`.`utilisateurs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `telephone` INT NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `MF` VARCHAR(70) NULL,
  `role` ENUM('admin', 'fournisseur', 'livreur', 'ouvrier') NOT NULL,
  `frais_de_livraison` INT NULL,
  `frais_de_retour` INT NULL,
  `virements` LONGTEXT NULL,
  `addresse` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
----------------------------------------------------------------------