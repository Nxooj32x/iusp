package org.iusp.common.controller;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.iusp.base.BaseController;
import org.iusp.base.exception.DaoException;
import org.iusp.base.exception.ServiceException;
import org.iusp.base.exception.WebException;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.User;
import org.iusp.common.service.UserService;
import org.iusp.utils.IuspAssert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 *
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@Controller
public class HomeController extends BaseController {


    /**
     * LOG对象
     */
    private static Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            IuspAssert.notNull(getSessionUser(request),"用户session不存在");
        }catch (IllegalArgumentException e){
            log.info("{}",e.getLocalizedMessage());
            return "index";
        }
        return "home/home";
    }

    @RequestMapping(value = "/{name}/",method = RequestMethod.GET,headers = {"Accept=application/json"},consumes = {"application/json"},produces = {"application/json"})
    @ResponseBody
    public Object getUser(HttpServletRequest request, HttpServletResponse response, @PathVariable String name) throws Exception {
        User wangtao  = userService.findUserByUserName(name);
        IuspAssert.notNull(wangtao,"暂无此用户信息");
        log.info("{}",wangtao);
        return outActionReturn(response,wangtao,HttpStatus.OK);
    }

    @RequestMapping(value = "/user/",method = RequestMethod.POST,headers = {"Accept=application/json"},consumes = {"application/x-www-form-urlencoded"},produces = {"application/json"})
    @ResponseBody
    public Object _addUser(HttpServletRequest request, HttpServletResponse response, User user) throws Exception {
        return outActionReturn(response,user,HttpStatus.OK);
    }

    @RequestMapping(value = "/",method = RequestMethod.POST,headers = {"Accept=application/json"},consumes = {"application/json"},produces = {"application/json"})
    @ResponseBody
    public Object addUser(HttpServletRequest request, HttpServletResponse response, @RequestBody User user) throws Exception {
        return outActionReturn(response,user,HttpStatus.OK);
    }

    @RequestMapping(value = "/{name}/",method = RequestMethod.PUT,headers = {"Accept=application/json"},consumes = {"application/json"},produces = {"application/json"})
    @ResponseBody
    public Object editUser(HttpServletRequest request, HttpServletResponse response, @PathVariable String name,@RequestBody User user) throws Exception {
        User wangtao = userService.findUserByUserName(name);
        IuspAssert.notNull(wangtao,"暂无此用户信息");
        log.info("{}",user);
        return outActionReturn(response,user,HttpStatus.OK);
    }

    @RequestMapping(value = "/{name}/",method = RequestMethod.DELETE,headers = {"Accept=application/json"},consumes = {"application/json"},produces = {"application/json"})
    @ResponseBody
    public Object delUser(HttpServletRequest request, HttpServletResponse response, @PathVariable String name,@RequestBody  User user) throws Exception {
        User wangtao = userService.findUserByUserName(name);
        IuspAssert.notNull(wangtao,"暂无此用户信息");
        log.info("{}",user);
        return outActionReturn(response,user,HttpStatus.OK);
    }

    @RequestMapping(value = "/upload",method = RequestMethod.POST,headers = {"Accept=application/json"},produces = {"application/json"})
    @ResponseBody
    public Object uploadFile(HttpServletRequest request, HttpServletResponse response,@RequestParam(value = "file", required = false) MultipartFile file) throws Exception {
        int length = file.getBytes().length;
        log.info("{}",length);
        return outActionReturn(response,null,HttpStatus.OK);
    }

}
