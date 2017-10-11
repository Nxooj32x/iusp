package org.iusp.base.ctxml.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class CrmController extends AbstractController implements BeanNameAware, InitializingBean, DisposableBean, BeanFactoryAware {
    private static final Log log = LogFactory.getLog(CrmController.class);

    private Map<String, String> configParams = new HashMap<String, String>();

    public Map<String, String> getConfigParams() {
        return configParams;
    }

    public void setConfigParams(Map<String, String> configParams) {
        this.configParams = configParams;
    }

    @Override
    protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.info(configParams);
        ModelAndView mv = new ModelAndView();
        mv.setViewName("admin/index");
        return mv;
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {

    }

    @Override
    public void setBeanName(String name) {

    }

    @Override
    public void destroy() throws Exception {

    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
