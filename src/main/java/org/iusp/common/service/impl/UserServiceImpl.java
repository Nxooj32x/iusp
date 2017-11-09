/*
 * Copyright (C), 2013-2014, 南京华内斯信息技术有限公司
 * FileName: UserServiceImpl.java
 * Author:   dong
 * Date:     Nov 6, 2014 11:34:57 PM
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package org.iusp.common.service.impl;

import org.iusp.common.bean.LoginUser;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.User;
import org.iusp.common.constant.Constant;
import org.iusp.common.dao.UserDao;
import org.iusp.common.service.UserService;
import org.iusp.utils.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    /*
     * (non-Javadoc)
     * 
     * @see
     */
    @Override
    public User findUserById(Integer id) {
        return userDao.findUserById(id);
    }

    @Override
    public QueryResult<User> getUserByPageno(int pageno, Map paramMap) {
        return userDao.getUserByPageno(pageno,paramMap);
    }

    @Override
    public User findUserByUserName(String userName) {
        return userDao.findUserByUserName(userName);
    }

    @Override
    public List<User> selectAll() {
        return userDao.selectAll() ;
    }

    @Override
    public LoginUser findLoginUserByUserName(String userName) {
        return userDao.findLoginUserByUserName(userName);
    }

    @Override
    public int addLoginUser(LoginUser loginUser) {
        LoginUser tmpUser = userDao.findLoginUserByUserName(loginUser.getUserName());

        int result = 0;
        if (tmpUser == null) {
            result = userDao.addLoginUser(loginUser);
        }
        return result;
    }

    @Override
    public int deleteLoginUserByUserName(String userName) {
        return userDao.deleteLoginUserByUserName(userName);
    }

    @Override
    public int findLoginUserCountByOrgCode(String dept, List<String> depts) {
        return userDao.findLoginUserCountByOrgCode(dept, depts);
    }

    @Override
    public SessionUser findSessionUserByUserName(String userName, String roleCode) {
        SessionUser user = null;
        if (Constant.Role.ROLECODE_STUDENT.equals(roleCode)) {
            user = userDao.findStudentInfoByUserName(userName);
        } else if (Constant.Role.ROLECODE_TEACHER.equals(roleCode) || Constant.Role.ROLECODE_WUGUAN.equals(roleCode)) {
            user = userDao.findTeacherInfoByUserName(userName);
        } else {
            user = new SessionUser();
            user.setUserName(userName);
            user.setRoleCode(roleCode);
        }
        return user;
    }

}
