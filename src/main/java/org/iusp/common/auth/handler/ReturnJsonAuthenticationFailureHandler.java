package org.iusp.common.auth.handler;

import com.google.gson.JsonObject;
import org.iusp.base.model.ErrorMsg;
import org.iusp.utils.BasicAjaxUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ReturnJsonAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        ErrorMsg eM = new ErrorMsg(exception.getMessage());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        BasicAjaxUtil.writeJsonObj(response, eM);
    }
}
