package org.iusp.common.dao;

import org.iusp.common.bean.LoginUser;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.Teacher;
import org.iusp.common.bean.User;
import org.iusp.utils.QueryResult;

import java.util.List;
import java.util.Map;

public interface UserDao {

    public User findUserById(Integer id);

    public QueryResult<User> getUserByPageno(int pageno,Map paramMap);

    public User findUserByUserName(String userName);

    public List<User> selectAll();

    LoginUser findLoginUserByUserName(String userName);

    int addLoginUser(LoginUser loginUser);

    int deleteLoginUserByUserName(String userName);

    int findLoginUserCountByOrgCode(String dept, List<String> depts);

    SessionUser findStudentInfoByUserName(String userName);

    SessionUser findTeacherInfoByUserName(String userName);

    List<Teacher> findTeachersByOrgCode(String parentCode);
}
