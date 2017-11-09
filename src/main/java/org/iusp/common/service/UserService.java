package org.iusp.common.service;


import org.iusp.common.bean.LoginUser;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.User;
import org.iusp.utils.QueryResult;

import java.util.List;
import java.util.Map;

/**
 * 〈一句话功能简述〉<br> 
 * 〈功能详细描述〉
 *
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public interface UserService {

    public User findUserById(Integer id);

    public QueryResult<User> getUserByPageno(int pageno, Map paramMap);

    public User findUserByUserName(String userName);

    public List<User> selectAll();

    LoginUser findLoginUserByUserName(String userName);

    int addLoginUser(LoginUser loginUser);

    int deleteLoginUserByUserName(String userName);

    int findLoginUserCountByOrgCode(String dept,List<String> depts);

    public SessionUser findSessionUserByUserName(String userName, String roleCode);
}
