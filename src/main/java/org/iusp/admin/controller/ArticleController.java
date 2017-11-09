package org.iusp.admin.controller;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.StringUtil;
import com.google.gson.JsonObject;
import org.iusp.base.BaseController;
import org.iusp.base.model.MessageBean;
import org.iusp.common.bean.Article;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.constant.Constant;
import org.iusp.common.service.ArticleService;
import org.iusp.utils.IuspAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/admin/article")
public class ArticleController extends BaseController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = "/queryArticleList",method = RequestMethod.POST)
    public String queryArticleList(HttpServletRequest request, Article article, Integer pageNumber, Integer pageSize) {
        String stype = request.getParameter("gold");
        String pvalue = request.getParameter("pvalue");
        if("title".equals(stype)){
            article.setTitle(pvalue);
        }
        if("author".equals(stype)){
            article.setAuthor(pvalue);
        }
        request.setAttribute("type", article.getType());
        PageInfo queryResult = articleService.queryArticleForPage(article, pageNumber, pageSize);
        request.setAttribute("queryResult", queryResult);

        // 查询参数回写
        Map<String, Object> pageParam = new HashMap<String, Object>();
        pageParam.put("title", null != article ? article.getTitle() : "");
        pageParam.put("type", null != article ? article.getType() : "");
        request.setAttribute("pageParam", pageParam);
        return "admin/article/articleQueryList";
    }


    @RequestMapping(value = "/searchArticleForward",method = RequestMethod.GET)
    public String searchArticleForward(HttpServletRequest request, HttpServletResponse response, String type) {
        request.setAttribute("type", type);
        return "admin/article/articleLst";
    }

    @RequestMapping(value = "/addArticleForward",method = RequestMethod.GET)
    public String addArticleForward(HttpServletRequest request, HttpServletResponse response, String type) {
        request.setAttribute("type", type);
        return "admin/article/insertArticle";
    }

    @RequestMapping(value = "/mdfArticleSearch",method = RequestMethod.GET)
    public String mdfArticleSearch(HttpServletRequest request, HttpServletResponse response, Article article) {
        Integer id = article.getId();
        article = articleService.findArticleById(id);
        String content =  new String(article.getContent()==null? "".getBytes():article.getContent());
        request.setAttribute("articlen", article);
        request.setAttribute("content", content);
        return "admin/article/mdfArticle";
    }


    @RequestMapping(value = "/addArticle",method = RequestMethod.POST)
    @ResponseBody
    public Object addArticle(HttpServletRequest request, HttpServletResponse response, Article article) throws Exception  {
            SessionUser currentUser = (SessionUser)request.getSession().getAttribute(Constant.Session.SESSION_NAME);
            if(currentUser == null){
                return outActionError(response,"用户登录过期",HttpStatus.UNAUTHORIZED);
            }else{
                article.setAuthor(currentUser.getUserName());
                String content =  new String(article.getContent()==null? "".getBytes():article.getContent());
                content = content.substring(0, 15);
                content = content.replaceAll("<p>", "");
                article.setSummary(content);
                article.setCreateTime(new Date());
                int result = articleService.addArticle(article);
                return outActionReturn(response,result, HttpStatus.CREATED);
            }
    }

    /**
     *   $.ajax({
             url: '${base}/admin/article/deleteArticle',
             type: 'DELETE',
             dataType: "json",
             contentType:"application/json",
             data: JSON.stringify({"ids":id}),
             success: function(data){

             }
          })
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping(value = "/deleteArticle",method = RequestMethod.DELETE)
    @ResponseBody
    public Object deleteArticle(HttpServletRequest request, HttpServletResponse response,@RequestBody  Map map) throws Exception {
        Object idsObj = map.get("ids");
        if (StringUtil.isEmpty(idsObj.toString())) {
            return outActionError(response,"参数错误",HttpStatus.BAD_REQUEST);
        } else {
            String[] idArr = idsObj.toString().split(",");
            for (String id : idArr) {
                articleService.deleteArticleById(Integer.parseInt(id));
            }
        }
        return outActionReturn(response,new MessageBean(true,"删除成功"), HttpStatus.OK);
    }

    /**
     * $.ajax({
         url: '${base}/admin/article/mdfArticle',
         type: 'put',
         async: false,
         dataType: "json",
         data:{"title" : title,"content":content,"id":${articlen.id}}),
         success: function(data){

         }
       })
     * @param request
     * @param response
     * @param article
     * @return
     */
    @RequestMapping(value = "/mdfArticle",method = RequestMethod.PUT)
    @ResponseBody
    public Object putArticle(HttpServletRequest request, HttpServletResponse response, Article article)throws Exception {

        Integer id = article.getId();
        IuspAssert.isNull(article,"参数错误");
        Article barticle = articleService.findArticleById(id);
        barticle.setContent(article.getContent());
        barticle.setTitle(article.getTitle());

        String content =  new String(article.getContent()==null? "".getBytes():article.getContent());
        content = content.substring(0, 15);
        content = content.replaceAll("<p>", "");
        barticle.setSummary(content);
        int i = articleService.updateArticle(barticle);
        return outActionReturn(response,new MessageBean(true,"修改成功"),HttpStatus.OK);

    }

    /**
     * $.ajax({
             url: '${base}/admin/article/mdfArticle',
             type: 'put',
             async: false,
             contentType:"application/json",
             dataType: "json",
             data: JSON.stringify({"title" : title,"content":content,"id":${articlen.id}}),
             success: function(data){

             }
        })
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping(value = "/mdfArticle",method = RequestMethod.PATCH)
    @ResponseBody
    public Object patchArticle(HttpServletRequest request, HttpServletResponse response,@RequestBody Map map) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("flag", false);
        jsonObject.addProperty("message", "修改失败");
        return jsonObject.toString();
    }
}
