/*
 * Copyright (C), 2013-2014, 南京华内斯信息技术有限公司
 * FileName: LoginController.java
 * Author:   dong
 * Date:     Nov 4, 2014 7:43:00 PM
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package org.iusp.common.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.iusp.base.BaseController;
import org.iusp.base.ctxml.model.People;
import org.iusp.common.bean.User;
import org.iusp.common.service.UserService;
import org.iusp.utils.QueryResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@Controller
public class HomeController extends BaseController {

    @Autowired
    private People cutesource;

    /**
     * LOG对象
     */
    private static Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(HttpServletRequest request, HttpServletResponse response) {
        log.info("custom xml bean {}",cutesource);
        return "index";
    }

    @RequestMapping(value = "/index/{no}",method = RequestMethod.GET)
    @ResponseBody
    public Object index(HttpServletRequest request, HttpServletResponse response,
                        @PathVariable Integer no,
                        @RequestParam(value="page",required=false,defaultValue = "1") Integer page) {
        User userById = userService.findUserById(no);
        QueryResult<User> userByPageno = userService.getUserByPageno(page, new HashMap());
        log.info("UserPage {}",userByPageno);
        return userByPageno;
    }


}
