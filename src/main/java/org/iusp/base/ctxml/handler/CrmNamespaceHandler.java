package org.iusp.base.ctxml.handler;

import org.iusp.base.ctxml.parser.CrmDefinitionParser;
import org.springframework.beans.factory.xml.NamespaceHandlerSupport;

public class CrmNamespaceHandler  extends NamespaceHandlerSupport {
    @Override
    public void init() {
        registerBeanDefinitionParser("controller", new CrmDefinitionParser());
    }
}
