package org.iusp.common.auth.entrypoint;

import org.iusp.base.model.ErrorMsg;
import org.iusp.utils.BasicAjaxUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class IuspLoginUrlAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {
    /**
     * @param loginFormUrl URL where the login page can be found. Should either be
     *                     relative to the web-app context path (include a leading {@code /}) or an absolute
     *                     URL.
     */
    public IuspLoginUrlAuthenticationEntryPoint(String loginFormUrl) {
        super(loginFormUrl);
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        if(isAjax(request,response)){
            ErrorMsg eM = new ErrorMsg("登录过期，请重新登录");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            BasicAjaxUtil.writeJsonObj(response, eM);
            return;
        }else{
            super.commence(request, response, authException);
        }
    }

    private boolean isAjax(HttpServletRequest request, HttpServletResponse response){

        if(request.getHeader("Accept").toString().equals("application/json")){
            return true;
        }
        return false;
    }

}
