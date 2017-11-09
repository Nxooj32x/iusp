package org.iusp.common.service.impl;

import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.WorkingLog;
import org.iusp.common.constant.Constant;
import org.iusp.common.dao.WorkingLogDao;
import org.iusp.common.service.WorkingLogService;
import org.iusp.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkingLogServiceImpl implements WorkingLogService {
    @Autowired
    private WorkingLogDao workingLogDao;
    @Override
    public WorkingLog findWorkingLogById(int i) {


        return workingLogDao.findWorkingLogById(i);
    }

    @Override
    public int findMyWorkingLogCount(WorkingLog log) {
        return workingLogDao.findMyWorkingLogCount(log);
    }

    @Override
    public int findWorkingLogCount(WorkingLog log, SessionUser user) {

        List<String> depts = new ArrayList<String>();

        // 部门负责人和副职可以看到本部门人员工作日志
        if (Constant.Teacher.POSITION_BMFZR.equals(user.getPositionCode())
                || Constant.Teacher.POSITION_BMFZ.equals(user.getPositionCode())) {
            depts.add(user.getOrgCode());
        }
        // 副院长 可以看到他分管部门的人员工作汇报
        /*else if (Constant.Teacher.POSITION_FYZ.equals(user.getPositionCode())) {
            if (StringUtil.isEmpty(log.getDeptCode())) {
                // 查询分管部门编码

                 * depts = organizationDao.queryPresidentOrgCodeByUserName(user .getUserName());

                depts.add(log.getDeptCode());
            } else {
                depts.add(log.getDeptCode());
            }
        }*/

        if (Constant.Teacher.POSITION_JZG.equals(user.getPositionCode()) && "Y".equals(log.getIsDept())) {
            depts.add(user.getOrgCode());
        } else {
            log.setApprover(user.getUserName());
        }

        int logCount = 0;
        // 院长和书记可以看到所有人的工作汇报
        if (Constant.Teacher.POSITION_YZ.equals(user.getPositionCode())
                || Constant.Teacher.POSITION_SJ.equals(user.getPositionCode())) {
            if (!StringUtil.isEmpty(log.getDeptCode())) {
                depts.add(log.getDeptCode());
                logCount = workingLogDao.findWorkingLogCount(log, depts, user.getOrgCode());
            } else {
                logCount = workingLogDao.findWorkingLogCount(log);
            }
        } else {
            logCount = workingLogDao.findWorkingLogCount(log, depts, user.getOrgCode());
        }

        return logCount;
    }
}
