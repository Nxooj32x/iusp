package org.iusp.base.ctxml.parser;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.iusp.base.ctxml.controller.CrmController;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.xml.AbstractSingleBeanDefinitionParser;
import org.springframework.beans.factory.xml.ParserContext;
import org.springframework.util.StringUtils;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.HashMap;
import java.util.Map;

public class CrmDefinitionParser extends AbstractSingleBeanDefinitionParser {
    private static final Log log = LogFactory.getLog(CrmDefinitionParser.class);

    @Override
    protected Class getBeanClass(Element element) {
        return CrmController.class;
    }

    @Override
    protected void doParse(Element element, BeanDefinitionBuilder crmController) {
        log.info(element);
        parseControllerParameters(crmController,element);
    }


    private void parseControllerParameters(BeanDefinitionBuilder crmController, Element element)
    {
        NodeList children = element.getChildNodes();
        Map<String, String> params = new HashMap<String, String>();
        for (int i = 0; i < children.getLength(); i++)
        {
            Node node = children.item(i);
            if (node instanceof Element)
            {
                Element child = (Element) node;
                if ("crm:config-param".equals(child.getNodeName()))
                {
                    params.put(child.getAttribute("name"), child.getAttribute("value"));
                }
            }
        }
        crmController.addPropertyValue("configParams", params);
    }

    @Override
    protected String resolveId(Element element, AbstractBeanDefinition definition, ParserContext parserContext) throws BeanDefinitionStoreException {
        String id = super.resolveId(element, definition, parserContext);
        return StringUtils.hasText(id) ? id : "crmController";
    }
}