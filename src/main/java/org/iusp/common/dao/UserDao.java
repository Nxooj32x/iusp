package org.iusp.common.dao;

import org.iusp.common.bean.User;
import org.iusp.utils.QueryResult;

import java.util.List;
import java.util.Map;

public interface UserDao {

    public User findUserById(Integer id);

    public QueryResult<User> getUserByPageno(int pageno,Map paramMap);

    public User findUserByUserName(String userName);

    public List<User> selectAll();

}
