package org.iusp.admin.controller;

import com.github.pagehelper.PageInfo;
import com.google.gson.JsonObject;
import org.iusp.base.BaseController;
import org.iusp.base.model.MessageBean;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.Software;
import org.iusp.common.service.SoftwareService;
import org.iusp.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin/software")
public class SoftwareController extends BaseController {

    @Autowired
    private SoftwareService softwareService;

    @RequestMapping(value = "/addSoftwareForward",method = RequestMethod.GET)
    public String addSoftwareForward(HttpServletRequest request,
                                     HttpServletResponse response) {
        return "admin/software/insertSoft";
    }

    @RequestMapping(value = "/searchSoftwareForward",method = RequestMethod.GET)
    public String searchSoftwareForward(HttpServletRequest request,
                                        HttpServletResponse response, String type) {
        request.setAttribute("type", type);// add wangxuan 2014-11-25
        return "admin/software/softD";
    }

    @RequestMapping(value = "/querySoftwareList",method = RequestMethod.POST)
    public String querySoftwareList(HttpServletRequest request,
                                    Software software, Integer pageNumber, Integer pageSize) {
        String stype = request.getParameter("gold");
        String pvalue = request.getParameter("pvalue");
        if ("downName".equals(stype)) {
            software.setDownName(pvalue);
        }
        if ("uploader".equals(stype)) {
            software.setUploader(pvalue);
        }
        PageInfo queryResult = softwareService
                .querySoftwareForPage(software, pageNumber, pageSize);
        request.setAttribute("queryResult", queryResult);

        // 查询参数回写
        Map<String, Object> pageParam = new HashMap<String, Object>();
        pageParam.put("downName", null != software ? software.getDownName()
                : "");
        pageParam.put("uploader", null != software ? software.getUploader()
                : "");
        request.setAttribute("pageParam", pageParam);

        if (request.getParameter("type").equals("05")) {//增加界面需求，修改人：王涛
            return "home/softwareQueryList";
        }else{
            return "admin/software/softwareQueryList";
        }
    }

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public String upload(@RequestParam("downName")
                         String downName, @RequestParam("descinfo")
                         String descinfo, @RequestParam(value = "file", required = false)
                         MultipartFile file, HttpServletRequest request,
                         HttpServletResponse response, Software software) throws IOException {

        PrintWriter out = response.getWriter();

        JsonObject jsonObject = new JsonObject();
        System.out.println("开始");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        System.out.println(sdf.format(new Date()));
        SessionUser currentUser = (SessionUser) request.getSession()
                .getAttribute(SessionUser.CURRENT_USER);
        String user = "";
        if (currentUser == null) {
            return "index";
        } else {
            user = currentUser.getUserName();
        }
        String path = request.getSession().getServletContext().getRealPath(
                "upload")
                + "//" + user + "//" + sdf.format(new Date());
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        // 保存
        Date date = new Date();
        try {
            file.transferTo(targetFile);
            software.setDownaddr("upload" + "/" + user + "/"
                    + sdf.format(date) + "/" + fileName);
            software.setUploader(user);
            software.setCreateTime(date);
            softwareService.addSoftware(software);
            jsonObject.addProperty("success", true);
            jsonObject.addProperty("message", "上传成功！");
            request.setAttribute("msg", "上传成功！");
        } catch (Exception e) {
            request.setAttribute("msg", "系统异常，新增失败");
            jsonObject.addProperty("message", "系统异常，新增失败");
            e.printStackTrace();
        }

        // modify by wangtao 2014-11-23
        // BasicAjaxUtil.writeJson(response, jsonObject.toString());
        // return null;
        // return "admin/software/softD.ftl";
        return "admin/software/loadWaiting";// 添加上传等待进度条界面。
        // end modify by wangtao 2014-11-23
    }

    @RequestMapping(value = "/deleteSoftware",method = RequestMethod.DELETE)
    @ResponseBody
    public Object deleteArticle(HttpServletRequest request,
                                HttpServletResponse response, @RequestBody Map map)throws Exception  {

        Object idsObj = map.get("ids");
        if (StringUtil.isEmpty(idsObj.toString())) {
            return outActionError(response,"参数错误", HttpStatus.BAD_REQUEST);
        } else {
            String[] idArr = idsObj.toString().split(",");
            try {
                for (String id : idArr) {
                    softwareService.deleteSoftwareById(Integer.parseInt(id));
                }
            } catch (RuntimeException e) {
                return outActionError(response,"参数错误", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return outActionReturn(response,new MessageBean(true,"删除成功"), HttpStatus.OK);
    }
}
