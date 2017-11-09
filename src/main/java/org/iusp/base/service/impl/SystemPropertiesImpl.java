package org.iusp.base.service.impl;

import org.iusp.base.service.SystemProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.*;
import org.springframework.web.context.WebApplicationContext;

import java.io.*;
import java.util.Properties;

public class SystemPropertiesImpl implements SystemProperties {

    private static Logger log = LoggerFactory.getLogger(SystemPropertiesImpl.class);


    @Override
    public boolean loadAllProperties(WebApplicationContext springContext){
        Properties prop = null;

        String servletContextName = springContext.getServletContext().getServletContextName();
        String path = springContext.getServletContext().getRealPath(
                "properties");
        InputStream in = null;
        PropertyResolver resolver = null;

        try {

            String basePath = path + "//baseConfig//"+servletContextName+".properties";
            prop = new Properties();
            in = new BufferedInputStream(new FileInputStream(basePath));
            prop.load(in);
            String base = prop.get("base").toString();
            prop = null;
            String[] split = base.split(";");
            for (String str :split){
                prop = new Properties();
                String _path = path + "//"+str+"//"+servletContextName+".properties";
                in = new BufferedInputStream(new FileInputStream(_path));
                prop.load(in);
                for (String key : prop.stringPropertyNames()) {
                    log.info("loading dir[ {} ] ->  iusp.properties  ---  key:{}  , value:{}",new Object[]{str,key, prop.stringPropertyNames()});
                    springContext.getServletContext().setAttribute(key,prop.getProperty(key).toString());
                }
                prop = null;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

}
