package org.iusp.base.service;


import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;

public interface SystemProperties {
    boolean loadAllProperties(WebApplicationContext springContext);
}
