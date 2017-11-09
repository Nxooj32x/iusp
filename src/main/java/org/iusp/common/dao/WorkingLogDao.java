package org.iusp.common.dao;

import org.iusp.common.bean.WorkingLog;

import java.util.List;

/**
 * Created by tao on 2017/10/30.
 */
public interface WorkingLogDao {
    WorkingLog findWorkingLogById(int i);

    int findMyWorkingLogCount(WorkingLog log);

    int findWorkingLogCount(WorkingLog log, List<String> depts, String orgCode);

    int findWorkingLogCount(WorkingLog log);
}
