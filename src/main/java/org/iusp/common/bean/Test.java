package org.iusp.common.bean;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;

import java.util.Locale;

/**
 * Created by tao on 2017/10/16.
 */
public class Test implements BeanNameAware, InitializingBean ,BeanFactoryAware,MessageSourceAware,ApplicationContextAware{
    private static final Log log = LogFactory.getLog(Test.class);

    @Override
    public void afterPropertiesSet() throws Exception {
    }

    public void initMethod(){
    }

    @Override
    public void setBeanName(String name) {
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
    }

    @Override
    public void setMessageSource(MessageSource messageSource) {
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

    }
}
