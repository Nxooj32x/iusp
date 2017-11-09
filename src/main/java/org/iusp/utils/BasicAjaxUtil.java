package org.iusp.utils;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * AJAX操作处理工具类
 * 
 * @author 12061772
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class BasicAjaxUtil {

    /**
     * 输出JSON数据到页面上去
     * 
     * @param response <code>HttpServletResponse</code>
     * @param jsonStr JSON字符串
     */
    public static void writeJson(HttpServletResponse response, String jsonStr) {
        response.setContentType("text/plan;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");  
        PrintWriter out = null;
        StringBuffer json = new StringBuffer();
        json.append(jsonStr);
        try {
            out = response.getWriter();
            out.write(json.toString());
        } catch (IOException e) {
        } finally {
            if(null != out){
                out.flush();
                out.close();
            }
        }
    }

    /**
     * 输出JSON数据到页面上去
     * 
     * @param response <code>HttpServletResponse</code>
     * @param object 需要转换为JSON数据的对象
     */
    public static void writeJsonObj(HttpServletResponse response, Object object) {
        Gson gson = new Gson();
        String reStr = gson.toJson(object);
        response.setContentType("application/text;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.write(reStr);
        } catch (IOException e) {
        } finally {
            if(null != out){
                out.flush();
                out.close();
            }
        }
    }
    
    /**
     * 输出文本数据到页面上去
     * 
     * @param response <code>HttpServletResponse</code>
     */
    public static void writeText(HttpServletResponse response, String text) {
        response.setContentType("application/text;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.write(text);
        } catch (IOException e) {
        } finally {
            if(null != out){
                out.flush();
                out.close();
            }
        }
    }

    /**
     * 对象列表转为jqgrid json格式: Object obj, String dataString其中任一个参数可以传null
     * 
     * @param page 当前页码
     * @param totalRecords 总记录数
     * @param totalPage 总页数
     * @param obj 数据对象，可以为list 也可以为object
     * @param dataString 自定义数据JSON字符串
     * @return JSON字符串
     */
    public static String formatJsonForJqGrid(int page, int totalRecords, int totalPage, Object obj, String dataString) {

        String data = "";
        if (StringUtil.isEmpty(dataString)) {
            if (obj != null) {
                // 传入obj不为空时，将obj转为JSON
                Gson gson = new Gson();
                data = gson.toJson(obj);
            }
        } else {
            data = dataString;
        }

        if (StringUtil.isEmpty(data)) {
            data = "\"\"";
        }

        StringBuffer json = new StringBuffer();
        json.append("{\"total\":\"").append(totalPage).append("\",");
        json.append("\"page\":\"").append(page).append("\",");// 当前页
        json.append("\"records\":\"").append(totalRecords).append("\",\"rows\":");// 总记录数
        json.append(data);
        json.append("}");

        return json.toString();
    }
}
