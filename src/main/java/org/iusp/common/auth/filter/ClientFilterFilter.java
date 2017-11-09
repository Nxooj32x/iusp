package org.iusp.common.auth.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ClientFilterFilter extends AbstractAuthenticationProcessingFilter {

    private static Logger log = LoggerFactory.getLogger(ClientFilterFilter.class);

    public static String defaultLoginAction = "/base/auth";
    public ClientFilterFilter(){
        super(defaultLoginAction);
    }

    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        String name = request.getParameter("j_username");
        String pwd = request.getParameter("j_password");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(name,pwd);
        Authentication auth = null;
        auth = this.getAuthenticationManager().authenticate(token);

        if(auth !=null && auth.isAuthenticated()){
            log.info("登录系统 {}",auth);
            return auth;
        }
        throw new AuthenticationServiceException("登录失败");
    }
}
