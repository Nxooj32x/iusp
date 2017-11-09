package org.iusp.common.controller;

import org.iusp.common.bean.OrganizationTree;
import org.iusp.common.service.OrganizationService;
import org.iusp.utils.BasicAjaxUtil;
import org.iusp.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping(value = "/orgQuery",method = RequestMethod.POST)
    @ResponseBody
    public Object orgQuery(HttpServletRequest request, HttpServletResponse response) {

        String id = request.getParameter("id");
        if (StringUtil.isEmpty(id)) {
            id = "00";
        }
        List<OrganizationTree> treeList = organizationService.queryOrgTreeListByParentCode(id);
        return treeList;
    }
}
