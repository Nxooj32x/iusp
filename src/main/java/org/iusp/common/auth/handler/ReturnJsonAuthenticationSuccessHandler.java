package org.iusp.common.auth.handler;

import com.google.gson.JsonObject;
import org.iusp.common.bean.LoginUser;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.service.UserService;
import org.iusp.utils.BasicAjaxUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ReturnJsonAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private static Logger log = LoggerFactory.getLogger(ReturnJsonAuthenticationSuccessHandler.class);

    private RequestCache requestCache = new HttpSessionRequestCache();

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        SessionUser sessionUser = (SessionUser)authentication;
        request.getSession().setAttribute(SessionUser.CURRENT_USER,sessionUser);

        SavedRequest savedRequest = requestCache.getRequest(request, response);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("flag", true);

        if(savedRequest != null){
            jsonObject.addProperty("hisotry", savedRequest.getRedirectUrl());
        }else{
            String scheme = request.getScheme();
            String serverName = request.getServerName();
            int serverPort = request.getServerPort();
            String url = scheme+"://"+serverName+(serverPort==80 ? "/":":"+serverPort);
            jsonObject.addProperty("hisotry", url);
        }

        BasicAjaxUtil.writeJson(response, jsonObject.toString());
    }
}
