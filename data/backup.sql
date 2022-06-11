-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: deltaEvents
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sysAdmin` tinyint(1) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,1,'test','test','test@test.com'),(2,0,'test_2','test_2','test_2@test.com'),(3,0,'aquif','test','test@email.com'),(4,1,'admin2','test','test@email.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventId` varchar(36) NOT NULL,
  `accountId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `info` longtext NOT NULL,
  `going` json DEFAULT NULL,
  `maybe` json DEFAULT NULL,
  `notGoing` json DEFAULT NULL,
  PRIMARY KEY (`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('6f017547-160e-4d74-8ab1-735b4b3934d9',3,'Bee Movie Watch Party','UniBar','2018-06-20 11:06:00','2018-06-20 13:08:00','<h1>COME WATCH WITH US</h1><p><strong><em><u>According to all known laws of aviation, there is no way a bee should be able to fly.</u></em></strong></p><p><strong><em><u>Its wings are too small to get its fat little body off the ground.</u></em></strong></p><p><strong><em><u>The bee, of course, flies anyway because bees don\'t care what humans think is impossible.</u></em></strong></p><p><strong><em><u>Yellow, black. Yellow, black. Yellow, black. Yellow, black.</u></em></strong></p><p>Ooh, black and yellow!</p><p>Let\'s shake it up a little.</p><p>Barry! Breakfast is ready!</p><p>Coming!</p><p>Hang on a second.</p><p>Hello?</p><p>Barry?</p><p>Adam?</p><p>Can you believe this is happening?</p><p>I can\'t.</p><p>I\'ll pick you up.</p><p>Looking sharp.</p><p>Use the stairs, Your father paid good money for those.</p><p>Sorry. I\'m excited.</p><p>Here\'s the graduate.</p><p>We\'re very proud of you, son.</p><p>A perfect report card, all B\'s.</p><p>Very proud.</p><p>Ma! I got a thing going here.</p><p>You got lint on your fuzz.</p><p>Ow! That\'s me!</p><p>Wave to us! We\'ll be in row 118,000.</p><p>Bye!</p><p>Barry, I told you, stop flying in the house!</p><p>Hey, Adam.</p><p>Hey, Barry.</p><p>Is that fuzz gel?</p><p>A little. Special day, graduation.</p>','[0, \"Aquif\"]','[0, \"Adit\"]','[0, \"Dan\"]');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-11 20:14:50
