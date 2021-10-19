CREATE TABLE `company` (
  `idcompany` int NOT NULL AUTO_INCREMENT,
  `address` varchar(450) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idcompany`),
  UNIQUE KEY `idcompany_UNIQUE` (`idcompany`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `password` varchar(1000) NOT NULL,
  `profile_pic` varchar(2000) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `faq` (
  `faqid` int NOT NULL AUTO_INCREMENT,
  `question` text,
  `answer` text,
  PRIMARY KEY (`faqid`),
  UNIQUE KEY `faqid_UNIQUE` (`faqid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8;



CREATE TABLE `icon` (
  `iconid` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(2000) DEFAULT NULL,
  `link` text,
  PRIMARY KEY (`iconid`),
  UNIQUE KEY `iconid_UNIQUE` (`iconid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `pages` (
  `pageid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`pageid`),
  UNIQUE KEY `pageid_UNIQUE` (`pageid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





