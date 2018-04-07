package org.iusp.common.controller;

import org.iusp.base.BaseController;
import org.iusp.base.model.MessageBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("auth")
public class LoginLogoutController extends BaseController {

    protected static Logger logger = LoggerFactory.getLogger(LoginLogoutController.class);
  
    /** 
     * 指向登录页面 
     */  
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage(  
            @RequestParam(value = "error", required = false) boolean error,
            ModelMap model) {
  
        logger.debug("Received request to show login page");  
  
        if (error == true) {  
            // Assign an error message  
            model.put("error",  
                    "You have entered an invalid username or password!");  
        } else {  
            model.put("error", "");  
        }  
        return "index";
  
    }  
  
    /** 
     * 指定无访问额权限页面 
     *  
     * @return 
     */  
    @RequestMapping(value = "/denied", method = RequestMethod.GET)
    @ResponseBody
    public Object getDeniedPage(HttpServletRequest request,
                                HttpServletResponse response) {
  
        logger.debug("Received request to show denied page");

        return outActionReturn(response,new MessageBean(true,"删除成功"), HttpStatus.OK);
  
    }  
}  