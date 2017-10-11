package org.iusp.base.ctxml.handler;

import org.iusp.base.ctxml.parser.PeopleBeanDefinitionParser;
import org.springframework.beans.factory.xml.NamespaceHandlerSupport;

public class MyNamespaceHandler extends NamespaceHandlerSupport {
    public void init() {  
        registerBeanDefinitionParser("people", new PeopleBeanDefinitionParser());
    }  
}  