# ************************************************************
# Sequel Pro SQL dump
# Version 4500
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: snackstore
# Generation Time: 2017-03-14 18:29:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table adonis_schema
# ------------------------------------------------------------

DROP TABLE IF EXISTS `adonis_schema`;

CREATE TABLE `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`)
VALUES
	(36,'1489250444760_users',1,'2017-03-14 10:47:22'),
	(37,'1489284686826_products',1,'2017-03-14 10:47:22'),
	(38,'1489284720610_audit_products',1,'2017-03-14 10:47:22'),
	(39,'1489284735545_purchases',1,'2017-03-14 10:47:22'),
	(40,'1489284747072_purchase_detail',1,'2017-03-14 10:47:22'),
	(41,'1489284766110_likes',1,'2017-03-14 10:47:23'),
	(42,'1489455075407_add_unique_users_email',1,'2017-03-14 10:47:23');

/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table audit_products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `audit_products`;

CREATE TABLE `audit_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(8,2) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `audit_products` WRITE;
/*!40000 ALTER TABLE `audit_products` DISABLE KEYS */;

INSERT INTO `audit_products` (`id`, `price`, `product_id`, `changed_at`)
VALUES
	(5,129.90,2,'2017-03-14 11:20:19');

/*!40000 ALTER TABLE `audit_products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;

INSERT INTO `likes` (`user_id`, `product_id`, `created_at`, `updated_at`)
VALUES
	(1,1,'2017-03-14 12:28:08','2017-03-14 12:28:08'),
	(1,3,'2017-03-14 12:28:28','2017-03-14 12:28:28');

/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `name`, `description`, `stock`, `price`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,'Café','de chiapas 500 gr molido fino',6,229.90,'2017-03-14 11:01:07','2017-03-14 12:27:27',NULL),
	(2,'Café','de chiapas 100 gr molido fino',15,100.00,'2017-03-14 11:01:32','2017-03-14 11:02:08','2017-03-14 11:02:08'),
	(3,'Papas fritas','naturales 125gr',12,10.50,'2017-03-14 11:43:12','2017-03-14 12:27:27',NULL);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="NO_AUTO_VALUE_ON_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`root`@`localhost` */ /*!50003 TRIGGER `after_products_update` AFTER UPDATE ON `products` FOR EACH ROW BEGIN
      	IF NEW.price <> OLD.price THEN
          INSERT INTO audit_products
            SELECT NULL, OLD.price, products.id, NOW()
            FROM products WHERE id = OLD.id;
        END IF;
      END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;


# Dump of table purchase_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `purchase_detail`;

CREATE TABLE `purchase_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `purchase_detail` WRITE;
/*!40000 ALTER TABLE `purchase_detail` DISABLE KEYS */;

INSERT INTO `purchase_detail` (`id`, `quantity`, `product_id`, `purchase_id`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,4,3,1,'2017-03-14 12:26:44','2017-03-14 12:26:44',NULL),
	(2,2,1,1,'2017-03-14 12:26:44','2017-03-14 12:26:44',NULL),
	(3,4,3,2,'2017-03-14 12:27:27','2017-03-14 12:27:27',NULL),
	(4,2,1,2,'2017-03-14 12:27:27','2017-03-14 12:27:27',NULL);

/*!40000 ALTER TABLE `purchase_detail` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table purchases
# ------------------------------------------------------------

DROP TABLE IF EXISTS `purchases`;

CREATE TABLE `purchases` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;

INSERT INTO `purchases` (`id`, `user_id`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,1,'2017-03-14 12:26:44','2017-03-14 12:26:44',NULL),
	(2,2,'2017-03-14 12:27:27','2017-03-14 12:27:27',NULL);

/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `is_admin`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,'porras@hackergarage.mx','$2a$10$EX23LVMszOcZHO1IDJIbLOjwtNREdFEQV8CG9KJ.kDYxfctVHhqCW',1,'2017-03-14 11:00:50','2017-03-14 11:00:50',NULL),
	(2,'usuario@gmail.com','$2a$10$dkN0ZAR0wJFjVlJYIMnVgO2GKx2hFRkxSdV3.iOzlJxyTXLrcKPBi',0,'2017-03-14 11:02:37','2017-03-14 11:02:37',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
