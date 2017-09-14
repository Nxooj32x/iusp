package org.iusp.common.component;

import org.iusp.common.bean.User;
import org.iusp.common.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomUserDetailsService implements UserDetailsService {

    private static Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserDao userDAO;

    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, DataAccessException {
  
        UserDetails user = null;  
  
        try {  
            User u = userDAO.findUserByUserName(username);
            user = new org.springframework.security.core.userdetails.User(u.getUserName(), u.getPassword()
                    .toLowerCase(), true, true, true, true,  
                    getAuthorities(u.getAccess()));
  
        } catch (Exception e) {  
            logger.error("Error in retrieving user");  
            throw new UsernameNotFoundException("Error in retrieving user");  
        }  
  
        return user;  
    }  
  
    /** 
     * 获得访问角色权限 
     *  
     * @param access 
     * @return 
     */  
    public Collection<GrantedAuthority> getAuthorities(Integer access) {
  
        List<GrantedAuthority> authList = new ArrayList(2);
  
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