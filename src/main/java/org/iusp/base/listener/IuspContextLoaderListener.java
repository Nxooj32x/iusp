package org.iusp.base.listener;

import org.iusp.base.AppProperties;
import org.iusp.base.service.SystemProperties;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;

public class IuspContextLoaderListener extends ContextLoaderListener implements AppProperties {
    private static final org.slf4j.Logger logger = LoggerFactory
            .getLogger(IuspContextLoaderListener.class);

    // 获取spring注入的bean对象
    private WebApplicationContext springContext;

    private SystemProperties systemProperties;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        super.contextInitialized(event);
        this.initApplicationParam(event);
    }

    @Override
    public void initApplicationParam(ServletContextEvent event) {
        springContext = WebApplicationContextUtils.getWebApplicationContext(event
                .getServletContext());
        if (springContext != null) {
            systemProperties = (SystemProperties) (springContext.getBean("systemProperties"));
        } else {
            logger.error("获取应用程序上下文失败!");
            return;
        }

        logger.info("初始化系统配置参数!");
        systemProperties.loadAllProperties(springContext);
        logger.info("初始化完成!");

    }

}
