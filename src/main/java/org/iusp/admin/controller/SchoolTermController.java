package org.iusp.admin.controller;

import com.github.pagehelper.PageInfo;
import org.iusp.admin.bean.SchoolTermBean;
import org.iusp.admin.service.SchoolTermService;
import org.iusp.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin/term")
public class SchoolTermController extends BaseController {

    @Autowired
    private SchoolTermService schoolTermService;

    @RequestMapping(value = "/searchForward",method = RequestMethod.GET)
    public String searchSoftwareForward(HttpServletRequest request, HttpServletResponse response, String type) {
        request.setAttribute("type", type); //add wangxuan 2014-12-01
        return "admin/termmanger/term";
    }

    @RequestMapping(value = "/queryList",method = RequestMethod.POST)
    public String querySoftwareList(HttpServletRequest request, SchoolTermBean bean, Integer pageNumber, Integer pageSize) {
        //  	String stype = request.getParameter("gold");
        String pvalue =  request.getParameter("pvalue");
        //    	if("downName".equals(stype)){
        //    		bean.setDownName(pvalue);
        //    	}
        //    	if("uploader".equals(stype)){
        //    		bean.setUploader(pvalue);
        //    	}
        if(pvalue!=null && !pvalue.equals("")){
            pvalue = pvalue + "-01-01 00:00:00.000";
            bean.setSchoolYear(Timestamp.valueOf(pvalue));
        }
        PageInfo<SchoolTermBean> queryResult = schoolTermService.queryForPage(bean, pageNumber, pageSize);
        request.setAttribute("queryResult", queryResult);

        // 查询参数回写
        Map<String, Object> pageParam = new HashMap<String, Object>();
        //        pageParam.put("downName", null != software ? software.getDownName() : "");
        //        pageParam.put("uploader", null != software ? software.getUploader() : "");
        request.setAttribute("pageParam", pageParam);
        return "admin/termmanger/QueryList";
    }

}
