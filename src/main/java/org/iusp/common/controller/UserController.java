package org.iusp.common.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.iusp.common.bean.User;
import org.iusp.common.service.UserService;
import org.iusp.utils.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/suresecurity")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user",method = RequestMethod.GET,headers = "Accept=application/json")
    @ResponseBody
    public Object getUserList(HttpServletRequest request, HttpServletResponse response,
                              @RequestParam(value = "filter",required = false) String filter,
                              @RequestParam(value = "sort",required = false) String sort,
                              @RequestParam(value = "page",required = false,defaultValue ="1") int page,
                              @RequestParam(value = "start",required = false,defaultValue ="0") int start,
                              @RequestParam(value = "limit",required = false,defaultValue ="10") int limit){
        filter = HtmlUtils.htmlUnescape(filter);
        sort = HtmlUtils.htmlUnescape(sort);
       // QueryResult<User> queryResult = userService.getUserByPageno(start,new HashMap());

        PageHelper.startPage(page, limit);
        List<User> users = userService.selectAll();
        PageInfo pageInfo = new PageInfo(users);
        return pageInfo;
    }
}
