package org.iusp.common.service;


import org.iusp.base.exception.DaoException;
import org.iusp.base.exception.ServiceException;
import org.iusp.common.bean.User;

/**
 * 〈一句话功能简述〉<br> 
 * 〈功能详细描述〉
 *
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public interface UserService {
    public User findUserByUserName(String userName) throws  DaoException ,ServiceException;
}
