/*
 * Copyright (C), 2002-2013, 苏宁易购电子商务有限公司
 * FileName: BaseController.java
 * Author:   12061772
 * Date:     2013-7-22 上午9:33:11
 * Description: Controller基类     
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package org.iusp.base;

import com.google.gson.Gson;
import org.iusp.base.exception.AppException;
import org.iusp.base.exception.DaoException;
import org.iusp.base.exception.ServiceException;
import org.iusp.base.exception.WebException;
import org.iusp.base.model.ActionReturn;
import org.iusp.base.model.ErrorMsg;
import org.iusp.common.bean.SessionUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 〈Controller基类〉
 * 
 * @author 12061772
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class BaseController {
    public final Logger logger = LoggerFactory.getLogger(getClass());

    protected void redirectUrl(String url, HttpServletResponse response) {
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected String getUserName(HttpServletRequest request) {
        SessionUser user = (SessionUser) request.getSession().getAttribute(SessionUser.CURRENT_USER);
        return null == user ? null : user.getUserName();
    }

    protected SessionUser getSessionUser(HttpServletRequest request) {
        SessionUser user = (SessionUser) request.getSession().getAttribute(SessionUser.CURRENT_USER);
        return user;
    }

    /**
     * controller类抛出异常的包装
     * @param request          请求
     * @param ex               异常
     * @return                 错误信息
     */
    @ExceptionHandler
    @ResponseBody
    public  Object  exp(HttpServletRequest request,HttpServletResponse response, Exception ex) {
        request.setAttribute("errorMsg", ex);
        logger.error(request.getRequestURI() + " : " + ex.getLocalizedMessage());
        if(ex instanceof WebException) {
            WebException we = (WebException) ex;
            return outActionReturn(response,we.getEmsg(), we.getHttpStatus());
        } else if(ex instanceof ServiceException) {
            ServiceException se = (ServiceException) ex;
            return outActionReturn(response,se.getEmsg(), HttpStatus.BAD_REQUEST);
        } else if(ex instanceof DaoException) {
            ex.printStackTrace();
            return outActionError(response,"服务提示：" + ex.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } else if(ex instanceof IllegalArgumentException){
            return outActionReturn(response,new ErrorMsg(ex.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        } else {
            ex.printStackTrace();
            return outActionError(response,"服务提示：" + ex.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @deprecated
     * @return
     */
    public Object outActionReturn(HttpServletResponse response,boolean success, Object obj) {
        return new ActionReturn(success, obj);
    }

    /**
     * 返回错误信息
     * @param errorMsg	错误信息
     * @param status	响应状态
     * @return
     */
    public Object outActionError(HttpServletResponse response,String errorMsg, HttpStatus status){
        ErrorMsg eM = new ErrorMsg(errorMsg);
        return outActionReturn(response,eM, status);
    }

    /**
     * 返回错误信息
     * @param errorMsg	错误信息
     * @param status	响应状态
     * @return
     */
    public Object outActionError(HttpServletResponse response,ErrorMsg errorMsg, HttpStatus status){
        return outActionReturn(response,errorMsg, status);
    }

    /**
     * 返回错误信息
     * @param errorMsg	错误信息
     * @param status	响应状态
     * @return
     */
    public Object outActionError(HttpServletResponse response,String errorMsg, int status){
        ErrorMsg eM = new ErrorMsg(errorMsg);
        return outActionReturn(response,eM, status);
    }

    /**
     * 返回对象
     * @param obj		要返回的对象
     * @param status	响应状态
     * @return
     */
    public Object outActionReturn(HttpServletResponse response,Object obj, HttpStatus status) {
        return outActionReturn(response,obj, status.value());
    }

    /**
     * 返回对象
     * @param obj		要返回的对象
     * @param status	响应状态
     * @return
     */
    public Object outActionReturn(HttpServletResponse response,Object obj, int status) {
        try {
            HttpStatus.valueOf(status);
        } catch (IllegalArgumentException  e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR.value();
        }
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        return obj;
    }

}