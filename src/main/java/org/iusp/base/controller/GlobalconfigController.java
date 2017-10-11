package org.iusp.base.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Controller
public class GlobalconfigController {


    @RequestMapping(value = "/globalconfig/baseConfig/ybAdmin",method = RequestMethod.GET)
    @ResponseBody
    public Object getBaseConfig(HttpServletRequest request, HttpServletResponse response){
        Map p = new HashMap<>();
        p.put("pageTplPath","/var/yearbook/pageTpl");
        p.put("isSendActiveMail",true);
        p.put("mobile_baseurl","http://localhost");
        p.put("headerLogo","yb_logo.png");
        p.put("baseUrl","http://localhost");
        p.put("headerTitle","管理平台");
        p.put("maxSectionNum",15);
        p.put("WSUrl","ws://jms.soulinfo.com:61614/stomp");
        return p;
    }

}
