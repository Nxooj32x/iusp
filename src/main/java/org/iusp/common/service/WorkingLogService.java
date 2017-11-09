package org.iusp.common.service;

import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.WorkingLog;

public interface WorkingLogService {
    WorkingLog findWorkingLogById(int i);

    int findMyWorkingLogCount(WorkingLog log);
    int findWorkingLogCount(WorkingLog log, SessionUser user);

}
