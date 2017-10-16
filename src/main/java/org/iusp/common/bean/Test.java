package org.iusp.common.bean;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.InitializingBean;

/**
 * Created by tao on 2017/10/16.
 */
public class Test implements BeanNameAware, InitializingBean ,BeanFactoryAware {
    private static final Log log = LogFactory.getLog(InitializingBean.class);

    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("Test  afterPropertiesSet");
    }

    public void initMethod(){
        log.info("Test  initMethod");
    }

    @Override
    public void setBeanName(String name) {
        log.info("Test  setBeanName:"+name);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        log.info(beanFactory);
    }
}
