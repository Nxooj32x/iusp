/*
MySQL Data Transfer
Source Host: localhost
Source Database: iusp
Target Host: localhost
Target Database: iusp
Date: 2017/11/9 23:51:48
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for iusp_common_article_info
-- ----------------------------
CREATE TABLE `iusp_common_article_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BT` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ZY` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `NR` blob,
  `CJR` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `LX` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `CJSJ` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_download_software
-- ----------------------------
CREATE TABLE `iusp_common_download_software` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `XSMC` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `MSXX` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SCZ` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `XZDZ` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `SCSJ` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_login_user
-- ----------------------------
CREATE TABLE `iusp_common_login_user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DLM` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `XM` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `BMBM` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_org
-- ----------------------------
CREATE TABLE `iusp_common_org` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BMBM` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `BMMC` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `BMMS` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `FJBMBM` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `ZZLX` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_president_org
-- ----------------------------
CREATE TABLE `iusp_common_president_org` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ZGH` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `BMBM` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_student
-- ----------------------------
CREATE TABLE `iusp_common_student` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `XH` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `KSH` varchar(14) COLLATE utf8_bin DEFAULT NULL,
  `XM` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `XMJC` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `SFZH` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `XBM` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `CSRQ` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `JGM` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  `MZM` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `XZZ` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `LXDH` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `DZXX` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `XZ` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `RXNY` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `NJ` varchar(4) COLLATE utf8_bin DEFAULT NULL,
  `BH` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_teacher
-- ----------------------------
CREATE TABLE `iusp_common_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zgh` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `xm` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `xmpy` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `sfzh` varchar(18) COLLATE utf8_bin DEFAULT NULL,
  `csrq` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `xbm` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `mzm` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `hyzkm` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `jgm` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  `jtzz` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `xzz` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `lxdh` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `dzxx` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_teacher_org
-- ----------------------------
CREATE TABLE `iusp_common_teacher_org` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ZZBM` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `ZGH` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `GWBM` varchar(3) COLLATE utf8_bin DEFAULT NULL,
  `GWMC` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `SFFZR` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_term_table
-- ----------------------------
CREATE TABLE `iusp_common_term_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `xn` date DEFAULT NULL,
  `djxq` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `kxsj` date DEFAULT NULL,
  `fjsj` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_common_user
-- ----------------------------
CREATE TABLE `iusp_common_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `realName` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `registAppId` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `registdate` date DEFAULT NULL,
  `updatedate` date DEFAULT NULL,
  `field1` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `field2` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `field3` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `type` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `source` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `mobilePhone` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `phoneState` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `emailState` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `roleCode` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `_name` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_working_log
-- ----------------------------
CREATE TABLE `iusp_working_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RZZT` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `RZLX` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `CGZNR` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `NGZJH` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `WTHJY` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `TXRZGH` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `TXRXM` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `RZSJ` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `NF` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `XQ` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `DJZ` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `TXSJ` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `SPRZGH` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `SPRXM` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `SPSJ` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `PY` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `PF` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `THYY` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iusp_working_log_config
-- ----------------------------
CREATE TABLE `iusp_working_log_config` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SFZDSP` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `MRPF` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `MRPJ` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ZGH` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `iusp_common_article_info` VALUES ('4', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', null, 'wangtao', '02', '2017-10-18');
INSERT INTO `iusp_common_article_info` VALUES ('5', '国考还是安心复习吧!', '国考还是安心复习吧!', null, 'wangtao', '03', '2017-10-19');
INSERT INTO `iusp_common_article_info` VALUES ('6', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', null, null, 'wangtao', '02', '2017-10-18');
INSERT INTO `iusp_common_article_info` VALUES ('9', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', null, null, 'wangtao', '02', '2017-10-18');
INSERT INTO `iusp_common_article_info` VALUES ('23', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', null, null, 'wangtao', '02', '2017-10-18');
INSERT INTO `iusp_common_article_info` VALUES ('24', '每天晚上19:00，每天进步一点点，中公教育与你不见不散', null, null, 'wangtao', '02', '2017-10-18');
INSERT INTO `iusp_common_article_info` VALUES ('42', '123', '123213213333', 0x3C703E313233323133323133333333333333333333333333333333333C2F703E, 'wangtao', '03', '2017-10-24');
INSERT INTO `iusp_common_article_info` VALUES ('43', '11111111111', '<ul><li>1111111', 0x3C756C3E3C6C693E3131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313C2F6C693E3C6C693E3131313131313131313131313131313131313C2F6C693E3C6C693E313131313131313131313131313131313131313C2F6C693E3C6C693E313131313131313131313131313C2F6C693E3C6C693E313131313131313131313131313C2F6C693E3C2F756C3E, 'wangtao', '01', '2017-10-24');
INSERT INTO `iusp_common_article_info` VALUES ('44', '1111111每11111111111111111111111111', '111111111111', 0x3C703E3131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313C2F703E, 'wangtao', '03', '2017-10-24');
INSERT INTO `iusp_common_download_software` VALUES ('6', 'd3', 'd3', 'wangtao', 'upload/wangtao/201710/d3.zip', '2017-10-24');
INSERT INTO `iusp_common_login_user` VALUES ('3', '111111', null, null);
INSERT INTO `iusp_common_org` VALUES ('1', '9000', '领导层', '领导层', '00', '00');
INSERT INTO `iusp_common_org` VALUES ('2', '9001', '行政部门', '行政部门', '00', '00');
INSERT INTO `iusp_common_org` VALUES ('3', '9002', '直属部门', '直属部门', '00', '00');
INSERT INTO `iusp_common_org` VALUES ('4', '9003', '教学部门', '教学部门', '00', '00');
INSERT INTO `iusp_common_org` VALUES ('5', '00', '南航金城学院', '南航金城学院', '', '00');
INSERT INTO `iusp_common_org` VALUES ('6', '99', '董事会', '董事会', '00', '01');
INSERT INTO `iusp_common_org` VALUES ('7', '98', '监事会', '监事会', '00', '01');
INSERT INTO `iusp_common_org` VALUES ('8', '97', '院领导', '院领导', '00', '01');
INSERT INTO `iusp_common_org` VALUES ('9', '96', '秘书处', '秘书处', '00', '01');
INSERT INTO `iusp_common_org` VALUES ('10', '60', '学院办公室', '学院办公室', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('11', '61', '党群工作部', '党群工作部', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('12', '62', '工会', '工会', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('13', '63', '发展规划处', '发展规划处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('14', '64', '财务处', '财务处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('15', '65', '人力资源处', '人力资源处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('16', '66', '教务处', '教务处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('17', '67', '学生处', '学生处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('18', '68', '团委', '团委', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('19', '69', '招生就业处', '招生就业处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('20', '70', '保卫处', '保卫处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('21', '71', '人才培养监督评估处', '人才培养监督评估处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('22', '72', '后勤保障处', '后勤保障处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('23', '73', '科研处', '科研处', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('24', '74', '民办高等教育研究所', '民办高等教育研究所', '00', '02');
INSERT INTO `iusp_common_org` VALUES ('25', '51', '终身教育学院', '终身教育学院', '00', '03');
INSERT INTO `iusp_common_org` VALUES ('26', '52', '信息资源管理与服务中心', '信息资源管理与服务中心', '00', '03');
INSERT INTO `iusp_common_org` VALUES ('27', '53', '图书馆', '图书馆', '00', '03');
INSERT INTO `iusp_common_org` VALUES ('28', '01', '机电工程系', '机电工程系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('29', '02', '信息工程系', '信息工程系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('30', '03', '自动化系', '自动化系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('31', '04', '外语系', '外语系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('32', '05', '经济系', '经济系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('33', '06', '管理系', '管理系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('34', '07', '民用航空系', '民用航空系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('35', '08', '基础部', '基础部', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('36', '09', '土木工程系', '土木工程系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('37', '10', '实验中心', '实验中心', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('38', '11', '艺术系', '艺术系', '00', '04');
INSERT INTO `iusp_common_org` VALUES ('39', '12', '车辆工程系', '车辆工程系', '00', '04');
INSERT INTO `iusp_common_president_org` VALUES ('1', '20132028', '63');
INSERT INTO `iusp_common_president_org` VALUES ('2', '20132028', '64');
INSERT INTO `iusp_common_president_org` VALUES ('3', '20132028', '65');
INSERT INTO `iusp_common_president_org` VALUES ('4', '20132028', '07');
INSERT INTO `iusp_common_president_org` VALUES ('5', '20122014', '60');
INSERT INTO `iusp_common_president_org` VALUES ('6', '20122014', '69');
INSERT INTO `iusp_common_president_org` VALUES ('7', '20122014', '62');
INSERT INTO `iusp_common_president_org` VALUES ('8', '20122014', '03');
INSERT INTO `iusp_common_president_org` VALUES ('9', '20122013', '66');
INSERT INTO `iusp_common_president_org` VALUES ('10', '20122013', '10');
INSERT INTO `iusp_common_president_org` VALUES ('11', '20122013', '06');
INSERT INTO `iusp_common_president_org` VALUES ('12', '20122013', '08');
INSERT INTO `iusp_common_president_org` VALUES ('13', '20142001', '61');
INSERT INTO `iusp_common_president_org` VALUES ('14', '20142001', '67');
INSERT INTO `iusp_common_president_org` VALUES ('15', '20142001', '68');
INSERT INTO `iusp_common_president_org` VALUES ('17', '20142001', '01');
INSERT INTO `iusp_common_president_org` VALUES ('18', '20142001', '11');
INSERT INTO `iusp_common_president_org` VALUES ('19', '20112017', '70');
INSERT INTO `iusp_common_president_org` VALUES ('20', '20112017', '52');
INSERT INTO `iusp_common_president_org` VALUES ('21', '20112017', '53');
INSERT INTO `iusp_common_president_org` VALUES ('23', '20112017', '02');
INSERT INTO `iusp_common_president_org` VALUES ('24', '20112017', '04');
INSERT INTO `iusp_common_president_org` VALUES ('25', '20122112', '72');
INSERT INTO `iusp_common_president_org` VALUES ('26', '20122112', '51');
INSERT INTO `iusp_common_president_org` VALUES ('27', '20122112', '05');
INSERT INTO `iusp_common_president_org` VALUES ('28', '20122112', '09');
INSERT INTO `iusp_common_term_table` VALUES ('1', '2017-10-19', '111111111', '2017-10-19', '2017-10-27');
INSERT INTO `iusp_common_user` VALUES ('1', 'wangtao', 'wangtao', 'E10ADC3949BA59ABBE56E057F20F883E', '1154016697@qq.com', '1', 'isup', '2017-09-17', '2017-09-17', '', '', '', '', '', '13961725119', '13961725119', '', '3');
INSERT INTO `iusp_common_user` VALUES ('2', '111111', '111111', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('3', '2', '2', 'E10ADC3949BA59ABBE56E057F20F883E', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('4', null, '3', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('5', null, '4', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('6', null, '5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('7', null, '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('8', null, '7', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('9', null, '8', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('10', null, '9', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('11', null, '10', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('12', null, '11', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('13', null, '12', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('15', null, '13', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('16', null, '14', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('17', null, '15', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('18', null, '16', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('19', null, '17', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('20', null, '18', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('21', null, '19', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('22', null, '20', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('23', null, '21', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('24', null, '22', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('25', null, '23', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('26', null, '24', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('27', null, '25', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('28', null, '26', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('29', null, '27', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('30', null, '29', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('32', null, '30', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('33', null, '31', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `iusp_common_user` VALUES ('34', null, '32', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
