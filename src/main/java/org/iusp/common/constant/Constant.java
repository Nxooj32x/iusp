package org.iusp.common.constant;

public class Constant {

    public interface Common {
        String YES = "Y";
        String NOT = "N";
    }

    public interface Session {
        String SESSION_NAME = "sessionUser";
    }

    public interface Role {
        String ROLECODE_STUDENT = "1";
        String ROLECODE_TEACHER = "2";
        String ROLECODE_ADMIN = "3";
        String ROLECODE_WUGUAN = "4";
    }

    public interface Teacher {
        // 001 ：院长，
        String POSITION_YZ = "001";
        // 002：书记，
        String POSITION_SJ = "002";
        // 003：副院长，
        String POSITION_FYZ = "003";
        // 004：部门负责人，
        String POSITION_BMFZR = "004";
        // 005：部门副职，
        String POSITION_BMFZ = "005";
        // 006：普通教职工
        String POSITION_JZG = "006";
        // 007：普通教职工
        String POSITION_HQZG = "007";
    }

    public interface WorkingLog {

        // 日志类型 01：日报，02：周报，03：月报
        String LOG_TYPE_DAILY = "01";
        String LOG_TYPE_WEEK = "02";
        String LOG_TYPE_MONTH = "03";

        // 日志状态 01：草稿， 02：已提交，03：审批通过，04：审批不通过（退回）
        String LOG_STATUS_DRAFT = "01";
        String LOG_STATUS_SUBMITED = "02";
        String LOG_STATUS_SUCCESS = "03";
        String LOG_STATUS_FAIL = "04";

    }

    public interface Weekly {

        String YEAR = "2014";
        String TERM = "二";

        String BEGIN_TIME = "2014-09-01 00:00:00";
        String END_TIME = "2015-02-15 23:59:59";
    }
}