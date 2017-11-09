package org.iusp.utils;


import org.iusp.common.bean.SessionUser;
import org.iusp.common.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionCounter implements HttpSessionListener {

    private static Logger log = LoggerFactory.getLogger(SessionCounter.class);

    public void sessionCreated(HttpSessionEvent event) {

    }
    public void sessionDestroyed(HttpSessionEvent event) {
        ServletContext ctx = event.getSession().getServletContext();
        ApplicationContext springCtx = WebApplicationContextUtils.getWebApplicationContext(event.getSession().getServletContext());
        UserService userService = (UserService)(springCtx.getBean("userService"));
        SessionUser sessionUser = (SessionUser) event.getSession().getAttribute("sessionUser");
        userService.deleteLoginUserByUserName(sessionUser.getUserName());
        log.info("{} 用户退出系统",sessionUser.getUserName());
    }
}
