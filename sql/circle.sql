/*
Navicat MySQL Data Transfer

Source Server         : TT
Source Server Version : 50728
Source Host           : 49.235.41.66:3306
Source Database       : circle

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2019-12-08 13:12:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for circles
-- ----------------------------
DROP TABLE IF EXISTS `circles`;
CREATE TABLE `circles` (
  `cname` varchar(50) NOT NULL,
  `cbrief` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `contentId` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `circle` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contentId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for topics
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `topicId` int(50) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `circle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topicId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `nickname` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `passwd` varchar(20) DEFAULT NULL,
  `circle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_circles
-- ----------------------------
DROP TABLE IF EXISTS `user_circles`;
CREATE TABLE `user_circles` (
  `ucId` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT NULL,
  `cname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ucId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
