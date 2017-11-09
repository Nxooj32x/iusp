package org.iusp.common.bean;

import java.util.Date;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author Tommy Xu
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class WorkingLog {

    private Integer id;

    // 日志状态 01：草稿， 02：已提交，03：审批通过，04：审批不通过（退回）
    private String logStatus;

    // 日志类型 01：日报，02：周报，03：月报
    private String logType;

    // 今天/本周/本月工作情况
    private String nowWorkInfo;

    // 下周/下月工作计划
    private String nextWorkInfo;

    // 问题与建议
    private String question;

    // 职工号
    private String staffNo;

    // 职工姓名
    private String staffName;

    // 日报时间
    private String logTime;

    private String logTimeBegin;

    private String logTimeEnd;

    // 周报年份
    private String year;

    // 周报学期
    private String term;

    // 周报第几周
    private String week;

    // 时间填入时间
    private Date fillTime;

    private String fillTimeBegin;

    private String fillTimeEnd;

    // 审批人职工号
    private String approver;

    // 审批人姓名
    private String approverName;

    // 审批时间
    private String approveTime;

    // 评语
    private String comment;

    // 评分（01：优良， 02：合格， 03：不合格）
    private String score;

    // 退回原因
    private String returnReason;

    private Organization staffOrg;

    private String isApprove;

    private String deptCode;

    private String keyWords;

    // 是否自动评审
    private String autoCheckflg;

    // 自动评审天数
    private String autoCheckCnt;

    private String isDept;

    private String userName;

    /**
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return the logStatus
     */
    public String getLogStatus() {
        return logStatus;
    }

    /**
     * @param logStatus the logStatus to set
     */
    public void setLogStatus(String logStatus) {
        this.logStatus = logStatus;
    }

    /**
     * @return the logType
     */
    public String getLogType() {
        return logType;
    }

    /**
     * @param logType the logType to set
     */
    public void setLogType(String logType) {
        this.logType = logType;
    }

    /**
     * @return the nowWorkInfo
     */
    public String getNowWorkInfo() {
        return nowWorkInfo;
    }

    /**
     * @param nowWorkInfo the nowWorkInfo to set
     */
    public void setNowWorkInfo(String nowWorkInfo) {
        this.nowWorkInfo = nowWorkInfo;
    }

    /**
     * @return the nextWorkInfo
     */
    public String getNextWorkInfo() {
        return nextWorkInfo;
    }

    /**
     * @param nextWorkInfo the nextWorkInfo to set
     */
    public void setNextWorkInfo(String nextWorkInfo) {
        this.nextWorkInfo = nextWorkInfo;
    }

    /**
     * @return the question
     */
    public String getQuestion() {
        return question;
    }

    /**
     * @param question the question to set
     */
    public void setQuestion(String question) {
        this.question = question;
    }

    /**
     * @return the staffNo
     */
    public String getStaffNo() {
        return staffNo;
    }

    /**
     * @param staffNo the staffNo to set
     */
    public void setStaffNo(String staffNo) {
        this.staffNo = staffNo;
    }

    /**
     * @return the logTime
     */
    public String getLogTime() {
        return logTime;
    }

    /**
     * @param logTime the logTime to set
     */
    public void setLogTime(String logTime) {
        this.logTime = logTime;
    }

    /**
     * @return the fillTime
     */
    public Date getFillTime() {
        return fillTime;
    }

    /**
     * @param fillTime the fillTime to set
     */
    public void setFillTime(Date fillTime) {
        this.fillTime = fillTime;
    }

    /**
     * @return the approver
     */
    public String getApprover() {
        return approver;
    }

    /**
     * @param approver the approver to set
     */
    public void setApprover(String approver) {
        this.approver = approver;
    }

    /**
     * @return the approveTime
     */
    public String getApproveTime() {
        return approveTime;
    }

    /**
     * @param approveTime the approveTime to set
     */
    public void setApproveTime(String approveTime) {
        this.approveTime = approveTime;
    }

    /**
     * @return the comment
     */
    public String getComment() {
        return comment;
    }

    /**
     * @param comment the comment to set
     */
    public void setComment(String comment) {
        this.comment = comment;
    }

    /**
     * @return the returnReason
     */
    public String getReturnReason() {
        return returnReason;
    }

    /**
     * @param returnReason the returnReason to set
     */
    public void setReturnReason(String returnReason) {
        this.returnReason = returnReason;
    }

    /**
     * @return the score
     */
    public String getScore() {
        return score;
    }

    /**
     * @param score the score to set
     */
    public void setScore(String score) {
        this.score = score;
    }

    /**
     * @return the staffName
     */
    public String getStaffName() {
        return staffName;
    }

    /**
     * @param staffName the staffName to set
     */
    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    /**
     * @return the approverName
     */
    public String getApproverName() {
        return approverName;
    }

    /**
     * @param approverName the approverName to set
     */
    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    /**
     * @return the staffOrg
     */
    public Organization getStaffOrg() {
        if (null == staffOrg) {
            staffOrg = new Organization();
        }
        return staffOrg;
    }

    /**
     * @param staffOrg the staffOrg to set
     */
    public void setStaffOrg(Organization staffOrg) {
        this.staffOrg = staffOrg;
    }

    /**
     * @return the year
     */
    public String getYear() {
        return year;
    }

    /**
     * @param year the year to set
     */
    public void setYear(String year) {
        this.year = year;
    }

    /**
     * @return the term
     */
    public String getTerm() {
        return term;
    }

    /**
     * @param term the term to set
     */
    public void setTerm(String term) {
        this.term = term;
    }

    /**
     * @return the week
     */
    public String getWeek() {
        return week;
    }

    /**
     * @param week the week to set
     */
    public void setWeek(String week) {
        this.week = week;
    }

    /**
     * @return the isApprove
     */
    public String getIsApprove() {
        return isApprove;
    }

    /**
     * @param isApprove the isApprove to set
     */
    public void setIsApprove(String isApprove) {
        this.isApprove = isApprove;
    }

    /**
     * @return the deptCode
     */
    public String getDeptCode() {
        return deptCode;
    }

    /**
     * @param deptCode the deptCode to set
     */
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    /**
     * @return the keyWords
     */
    public String getKeyWords() {
        return keyWords;
    }

    /**
     * @param keyWords the keyWords to set
     */
    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    /**
     * @return the logTimeBegin
     */
    public String getLogTimeBegin() {
        return logTimeBegin;
    }

    /**
     * @param logTimeBegin the logTimeBegin to set
     */
    public void setLogTimeBegin(String logTimeBegin) {
        this.logTimeBegin = logTimeBegin;
    }

    /**
     * @return the logTimeEnd
     */
    public String getLogTimeEnd() {
        return logTimeEnd;
    }

    /**
     * @param logTimeEnd the logTimeEnd to set
     */
    public void setLogTimeEnd(String logTimeEnd) {
        this.logTimeEnd = logTimeEnd;
    }

    /**
     * @return the fillTimeBegin
     */
    public String getFillTimeBegin() {
        return fillTimeBegin;
    }

    /**
     * @param fillTimeBegin the fillTimeBegin to set
     */
    public void setFillTimeBegin(String fillTimeBegin) {
        this.fillTimeBegin = fillTimeBegin;
    }

    /**
     * @return the fillTimeEnd
     */
    public String getFillTimeEnd() {
        return fillTimeEnd;
    }

    /**
     * @param fillTimeEnd the fillTimeEnd to set
     */
    public void setFillTimeEnd(String fillTimeEnd) {
        this.fillTimeEnd = fillTimeEnd;
    }

    public String getAutoCheckCnt() {
        return autoCheckCnt;
    }

    public void setAutoCheckCnt(String autoCheckCnt) {
        this.autoCheckCnt = autoCheckCnt;
    }

    public String getAutoCheckflg() {
        return autoCheckflg;
    }

    public void setAutoCheckflg(String autoCheckflg) {
        this.autoCheckflg = autoCheckflg;
    }

    public String getIsDept() {
        return isDept;
    }

    public void setIsDept(String isDept) {
        this.isDept = isDept;
    }

    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

}
