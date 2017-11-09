/*
 * Copyright (C), 2013-2014, 南京华内斯信息技术有限公司
 * FileName: LoginController.java
 * Author:   dong
 * Date:     Nov 4, 2014 7:43:00 PM
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package org.iusp.common.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.pagehelper.PageInfo;
import org.iusp.base.BaseController;
import org.iusp.common.bean.Article;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.Software;
import org.iusp.common.bean.User;
import org.iusp.common.constant.Constant;
import org.iusp.common.service.ArticleService;
import org.iusp.common.service.SoftwareService;
import org.iusp.common.service.UserService;
import org.iusp.utils.QueryResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    private ArticleService articleService;

    @Autowired
    private SoftwareService softwareService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(HttpServletRequest request, HttpServletResponse response) {
        loadInitData(request);
        SessionUser sessionUser = getSessionUser(request);
        log.info("",sessionUser);
        if(sessionUser != null){
            if (Constant.Role.ROLECODE_ADMIN.equals(sessionUser.getRoleCode())) {
                return "admin/admin";
            } else {
                request.setAttribute("sessionCount", userService.findLoginUserCountByOrgCode(null, null));
                return "ucenter/ucenter";
            }
        }
        return "index";
    }

    private void loadInitData(HttpServletRequest request) {
        List<Article> newsList = articleService.queryArticleByLimit("01", 2);
        List<Article> announceList = articleService.queryArticleByLimit("02", 5);
        List<Article> znList = articleService.queryArticleByLimit("03", 5);
        List<Software> sfList = softwareService.querySoftwareByLimit(5);

        request.setAttribute("newsList", newsList);
        request.setAttribute("announceList", announceList);
        request.setAttribute("znList", znList);
        request.setAttribute("softList", sfList);
    }

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(HttpServletRequest request, HttpServletResponse response){
        loadInitData(request);
        return "index";
    }

    @RequestMapping(value = "/ucenter",method = RequestMethod.GET)
    public String toUCenterPage(HttpServletRequest request) {
        loadInitData(request);
        return "ucenter/ucenter";
    }


    @RequestMapping(value = "/article", method = RequestMethod.GET)
    public String findArticleById(HttpServletRequest request, HttpServletResponse response,@RequestParam(value = "id",required = false,defaultValue = "0") Integer id) {

        if (id == 0) {
            this.redirectUrl(request.getContextPath() + "/index", response);
            return null;
        }

        Article article = articleService.findArticleById(id);
        request.setAttribute("article", article);
        String content = new String(article.getContent() == null ? "".getBytes() : article.getContent());
        request.setAttribute("content", content);
        return "home/article";
    }

    @RequestMapping(value = "/hot", method = RequestMethod.GET)
    public String toNewsArticlePage(HttpServletRequest request) {
        request.setAttribute("type", "01");
        return "home/articleList";
    }

    @RequestMapping(value = "/soft", method = RequestMethod.GET)
    public String toNewsSoftPage(HttpServletRequest request) {// 增加界面需求，修改人：王涛
        request.setAttribute("type", "05");
        return "home/softList";
    }

    @RequestMapping(value = "/announcement", method = RequestMethod.GET)
    public String toAnnouncementArticlePage(HttpServletRequest request) {
        request.setAttribute("type", "02");
        return "home/articleList";
    }

    @RequestMapping(value = "/guide", method = RequestMethod.GET)
    public String toGuideArticlePage(HttpServletRequest request) {
        request.setAttribute("type", "03");
        return "home/articleList";
    }

    @RequestMapping(value = "/queryHomeArticleList", method = RequestMethod.POST)
    public String queryArticleList(HttpServletRequest request, Article article, Integer pageNumber, Integer pageSize) {
        // TODO: 2017/10/18

        PageInfo queryResult = articleService.queryArticleForPage(article, pageNumber, pageSize);
        request.setAttribute("queryResult", queryResult);
        // 查询参数回写
        Map<String, Object> pageParam = new HashMap<String, Object>();
        pageParam.put("title", null != article ? article.getTitle() : "");
        pageParam.put("type", null != article ? article.getType() : "");
        request.setAttribute("pageParam", pageParam);
        return "home/articleQueryList";
    }

    @RequestMapping(value = "/index/{no}",method = RequestMethod.GET)
    @ResponseBody
    public Object getUserByPageno(HttpServletRequest request, HttpServletResponse response,
                        @PathVariable Integer no,
                        @RequestParam(value="page",required=false,defaultValue = "1") Integer page) {
        User userById = userService.findUserById(no);
        QueryResult<User> userByPageno = userService.getUserByPageno(page, new HashMap());
        log.info("UserPage {}",userByPageno);
        return userByPageno;
    }

    @RequestMapping(value = "/admin/index",method = RequestMethod.GET)
    public String adminIndex(HttpServletRequest request, HttpServletResponse response) {

        return "admin/index";
    }

    @RequestMapping(value = "/studentSer",method = RequestMethod.GET)
    public String studentSer(HttpServletRequest request, HttpServletResponse response) {
        //2014-12-8 王璇 学生服务指南点击后变颜色。
        request.setAttribute("studentSer", "studentSer");
        return "home/studentSer";
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @wangxuan
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping(value = "/teacherSer",method = RequestMethod.GET)
    public String teacherSer(HttpServletRequest request, HttpServletResponse response) {
        //2014-12-8 王璇 教职工服务指南点击后变颜色。
        request.setAttribute("teacherSer", "teacherSer");
        return "home/teacherSer";
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @wangxuan
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping(value = "/contacts",method = RequestMethod.GET)
    public String contacts(HttpServletRequest request, HttpServletResponse response) {
        //2014-12-8 王璇 校园通信录点击后变颜色。
        request.setAttribute("contacts", "contacts");
        return "home/contacts";
    }

    @RequestMapping(value = "/institutionSer",method = RequestMethod.GET)
    public String institutionSer(HttpServletRequest request, HttpServletResponse response) {
        //2014-12-8 王璇 单位服务点击后变颜色。
        request.setAttribute("institutionSer", "institutionSer");
        return "home/institutionSer";
    }
}
