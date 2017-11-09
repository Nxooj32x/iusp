package org.iusp.common.dao.impl;

import org.iusp.base.BaseDao;
import org.iusp.common.bean.WorkingLog;
import org.iusp.common.dao.WorkingLogDao;
import org.iusp.utils.StringUtil;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class WorkingLogDaoImpl extends BaseDao implements WorkingLogDao {
    @Override
    public WorkingLog findWorkingLogById(int id) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", id);

        return this.getSqlSession().selectOne("workingLog.findWorkingLogById", paramMap);
    }

    @Override
    public int findMyWorkingLogCount(WorkingLog log) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("userName", StringUtil.trim(log.getStaffNo()));
        paramMap.put("logType", StringUtil.trim(log.getLogType()));
        paramMap.put("logStatus", StringUtil.trim(log.getLogStatus()));

        return this.getSqlSession().selectOne("workingLog.findMyWorkingLogCount", paramMap);
    }

    @Override
    public int findWorkingLogCount(WorkingLog log, List<String> depts, String currDept) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("approver", StringUtil.trim(log.getApprover()));
        paramMap.put("logType", StringUtil.trim(log.getLogType()));
        paramMap.put("logStatus", StringUtil.trim(log.getLogStatus()));;
        paramMap.put("staffNo", StringUtil.trim(log.getStaffNo()));
        paramMap.put("staffName", StringUtil.trim(log.getStaffName()));
        paramMap.put("depts", depts);
        if(null == depts || depts.isEmpty()){
            paramMap.put("deptsIsNull", "Y");
        } else {
            paramMap.put("deptsIsNull", "N");
        }
        paramMap.put("currDept", currDept);

        return this.getSqlSession().selectOne("workingLog.findWorkingLogCount", paramMap);    }

    @Override
    public int findWorkingLogCount(WorkingLog queryParamObj) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("approver", StringUtil.trim(queryParamObj.getApprover()));
        paramMap.put("logType", StringUtil.trim(queryParamObj.getLogType()));
        paramMap.put("logStatus", StringUtil.trim(queryParamObj.getLogStatus()));
        paramMap.put("staffNo", StringUtil.trim(queryParamObj.getStaffNo()));
        paramMap.put("staffName", StringUtil.trim(queryParamObj.getStaffName()));

        // 日志时间
        paramMap.put("logTimeBegin", StringUtil.trim(queryParamObj.getLogTimeBegin()));
        paramMap.put("logTimeEnd", StringUtil.trim(queryParamObj.getLogTimeEnd()));
        // 日志提交时间
        paramMap.put("fillTimeBegin", StringUtil.trim(queryParamObj.getFillTimeBegin()));
        paramMap.put("fillTimeEnd", StringUtil.trim(queryParamObj.getFillTimeEnd()));
        // 评审人
        paramMap.put("approverName", StringUtil.trim(queryParamObj.getApproverName()));
        // 第几周
        paramMap.put("week", StringUtil.trim(queryParamObj.getWeek()));
        // 关键字
        paramMap.put("keyWords", StringUtil.trim(queryParamObj.getKeyWords()));
        // 得分
        paramMap.put("score", StringUtil.trim(queryParamObj.getScore()));

        return this.getSqlSession().selectOne("workingLog.findWorkingLog1Count", paramMap);    }
}
