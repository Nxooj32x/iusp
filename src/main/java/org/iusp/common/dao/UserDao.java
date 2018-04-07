package org.iusp.common.dao;

import org.iusp.base.exception.DaoException;
import org.iusp.common.bean.User;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface UserDao {
    public User findUserByUserName(String userName) throws DaoException;
}
