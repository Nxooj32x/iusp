package org.iusp.common.controller;

import com.google.gson.JsonObject;
import org.iusp.base.BaseController;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.WorkingLog;
import org.iusp.common.constant.Constant;
import org.iusp.common.service.WorkingLogService;
import org.iusp.utils.BasicAjaxUtil;
import org.iusp.utils.DateUtil;
import org.iusp.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/workingLog")
public class WorkingLogController extends BaseController {

    @Autowired
    private WorkingLogService workingLogService;

    @RequestMapping(value = "/daily",method= RequestMethod.GET)
    public String toAddDailyPage(HttpServletRequest request, HttpServletResponse response, String id, String m) {

        if (!StringUtil.isEmpty(id) && !StringUtil.isNumeric(id)) {
            this.redirectUrl(request.getContextPath() + "/index", response);
            return null;
        }

        WorkingLog log = null;
        if (!StringUtil.isEmpty(id)) {
            log = workingLogService.findWorkingLogById(Integer.parseInt(id));
        }
        request.setAttribute("wk", "work"); // wangxuan 2014-11-28
        // 前台点击工作日志变颜色的判断
        request.setAttribute("type", "daily");// wangxuan 2014-11-28

        // 写日报的时候，默认添加当前时间
        if(null == log){
            log = new WorkingLog();
            log.setLogTime(DateUtil.getNowDateLine());
        }
        request.setAttribute("log", log);

        request.setAttribute("menuName", m);

        return "workingLog/daily";
    }

    @RequestMapping(value = "queryMyLogCount",method = RequestMethod.GET,headers = "Accept=application/json")
    public String queryMyLogCount(HttpServletRequest request, HttpServletResponse response) {

        JsonObject jsonObj = new JsonObject();
        jsonObj.addProperty("flag", true);

        WorkingLog log = new WorkingLog();
        // draftCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_DRAFT);
        log.setStaffNo(this.getUserName(request));
        jsonObj.addProperty("draftCount", workingLogService.findMyWorkingLogCount(log));

        log = new WorkingLog();
        // approvedDailyCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_SUCCESS);
        log.setLogType(Constant.WorkingLog.LOG_TYPE_DAILY);
        log.setStaffNo(this.getUserName(request));
        jsonObj.addProperty("approvedDailyCount", workingLogService.findMyWorkingLogCount(log));

        log = new WorkingLog();
        // approvedWeeklyCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_SUCCESS);
        log.setLogType(Constant.WorkingLog.LOG_TYPE_WEEK);
        log.setStaffNo(this.getUserName(request));
        jsonObj.addProperty("approvedWeeklyCount", workingLogService.findMyWorkingLogCount(log));

        log = new WorkingLog();
        // approvedMonthCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_SUCCESS);
        log.setLogType(Constant.WorkingLog.LOG_TYPE_MONTH);
        log.setStaffNo(this.getUserName(request));
        jsonObj.addProperty("approvedMonthCount", workingLogService.findMyWorkingLogCount(log));

        log = new WorkingLog();
        // approvingLogCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_SUBMITED);
        log.setStaffNo(this.getUserName(request));

        jsonObj.addProperty("approvingLogCount", workingLogService.findMyWorkingLogCount(log));

        log = new WorkingLog();
        // returnLogCount
        log.setLogStatus(Constant.WorkingLog.LOG_STATUS_FAIL);
        log.setStaffNo(this.getUserName(request));
        jsonObj.addProperty("returnLogCount", workingLogService.findMyWorkingLogCount(log));

        SessionUser user = this.getSessionUser(request);
        log = new WorkingLog();
        // approvingLogCount
        log.setLogType(Constant.WorkingLog.LOG_TYPE_DAILY);
        log.setIsDept("Y");
        log.setApprover(this.getUserName(request));
        jsonObj.addProperty("deptDailyAllCount", workingLogService.findWorkingLogCount(log, user));
        log.setLogType(Constant.WorkingLog.LOG_TYPE_WEEK);
        log.setApprover(this.getUserName(request));
        log.setIsDept("Y");
        jsonObj.addProperty("deptWeekAllCount", workingLogService.findWorkingLogCount(log, user));
        log.setLogType(Constant.WorkingLog.LOG_TYPE_MONTH);
        log.setApprover(this.getUserName(request));
        log.setIsDept("Y");
        jsonObj.addProperty("deptMonthAllCount", workingLogService.findWorkingLogCount(log, user));
        BasicAjaxUtil.writeJson(response, jsonObj.toString());
        return null;
    }
}
