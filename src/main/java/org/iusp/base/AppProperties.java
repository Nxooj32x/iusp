package org.iusp.base;

import javax.servlet.ServletContextEvent;

/**
 * Created by tao on 2017/11/6.
 */
public interface AppProperties {
    void initApplicationParam(ServletContextEvent event);
}
