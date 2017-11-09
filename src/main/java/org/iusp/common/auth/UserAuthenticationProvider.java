package org.iusp.common.auth;

import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.User;
import org.iusp.common.service.UserService;
import org.iusp.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.*;

public class UserAuthenticationProvider implements AuthenticationProvider  {
    private static Logger logger = LoggerFactory.getLogger(UserAuthenticationProvider.class);

    @Autowired
    private UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)authentication;
        SessionUser sessionUser = new SessionUser();
        if(token.getPrincipal()!=null && token.getCredentials()!=null){

            User userByUserName = userService.findUserByUserName(token.getPrincipal().toString());
            if(userByUserName != null){
                if(userByUserName.getPassword() != null && userByUserName.getPassword().equals( StringUtil.md5(token.getCredentials().toString()))){
                    sessionUser.setUserName(token.getPrincipal().toString());
                    sessionUser.setName(token.getPrincipal().toString());
                    sessionUser.setPwd(token.getCredentials().toString());
                    sessionUser.setRoleCode(userByUserName.getRoleCode());
                    sessionUser.setRealName(userByUserName.getRealName());
                    sessionUser.setAuthenticated(true);
                    Set<GrantedAuthority> authorities = getAuthorities(userByUserName.getStatus());
                    sessionUser.setAccesses(authorities);
                    return sessionUser;
                }else {
                   throw new BadCredentialsException("密码错误");
                }
            }else{
                throw new UsernameNotFoundException("用户不存在");
            }
        }
        throw new AuthenticationServiceException("登录失败");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    /**
     * 获得访问角色权限
     *
     * @param access
     * @return
     */
    public Set<GrantedAuthority> getAuthorities(Integer access) {

        Set<GrantedAuthority> authList =  new HashSet<GrantedAuthority>();

        // 所有的用户默认拥有ROLE_USER权限
        logger.debug("Grant ROLE_USER to this user");
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));

        // 如果参数access为1.则拥有ROLE_ADMIN权限
        if (access.compareTo(1) == 0) {
            logger.debug("Grant ROLE_ADMIN to this user");
            authList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return authList;
    }
}
