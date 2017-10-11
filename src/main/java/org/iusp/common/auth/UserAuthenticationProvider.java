package org.iusp.common.auth;

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

/**
 * Created by tao on 2017/9/11.
 */
public class UserAuthenticationProvider implements AuthenticationProvider  {
    private static Logger logger = LoggerFactory.getLogger(UserAuthenticationProvider.class);

    @Autowired
    private UserService userService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)authentication;
        User user = new User();
        if(token.getPrincipal()!=null && token.getCredentials()!=null){

            org.iusp.common.bean.User userByUserName = userService.findUserByUserName(token.getPrincipal().toString());
            if(userByUserName != null){
                if(userByUserName.getPassword().equals( StringUtil.md5(token.getCredentials().toString()))){
                    user.setName(token.getPrincipal().toString());
                    user.setPwd(token.getCredentials().toString());
                    user.setAuthenticated(true);
                    Set<GrantedAuthority> authorities = getAuthorities(userByUserName.getStatus());
                    user.setAccesses(authorities);
                    return user;
                }else {
                   throw new BadCredentialsException("证书错误");
                }
            }else{
                throw new UsernameNotFoundException("用户未找到");
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
