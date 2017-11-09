/*
 * Copyright (C), 2013-2014, 南京华内斯信息技术有限公司
 * FileName: UserDaoImpl.java
 * Author:   dong
 * Date:     Nov 4, 2014 11:37:31 PM
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package org.iusp.common.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageHelper;
import org.iusp.base.BaseDao;
import org.iusp.common.bean.LoginUser;
import org.iusp.common.bean.SessionUser;
import org.iusp.common.bean.Teacher;
import org.iusp.common.bean.User;
import org.iusp.common.dao.UserDao;
import org.iusp.utils.QueryResult;
import org.springframework.stereotype.Component;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class UserDaoImpl extends BaseDao implements UserDao {

    /*
     * (non-Javadoc)
     * 
     * @see org.iusp.common.dao.UserDao#findUserById(java.lang.Integer)
     */
    @Override
    public User findUserById(Integer id) {
        User user = new User();
        user.setId(id);
        return this.getSqlSession().selectOne("user.findUserById", user);
    }

    @Override
    public QueryResult<User> getUserByPageno(int pageno, Map paramMap) {

        Integer count = this.getSqlSession().selectOne("user.gettotalcount",
                paramMap);

        QueryResult<User> queryResult = new QueryResult<User>(count,
                10, pageno);
        if (count == 0) {
            queryResult.setPageCount(0);
        }
        List<User> list = null;
        if (count > 0) {
            paramMap.put("startIndex", queryResult.getIndexNumber());
            paramMap.put("pageSize", queryResult.getPageSize());
            list = this.getSqlSession().selectList("user.queryUserForPage",
                    paramMap);
            queryResult.setDatas(list);
        }
        return queryResult;

    }

    @Override
    public User findUserByUserName(String userName) {
        User user = new User();
        user.setUserName(userName);
        return this.getSqlSession().selectOne("user.findUserByUserName", user);
    }

    @Override
    public List<User> selectAll() {
        Map paramMap = new HashMap();
        paramMap.put("username", "wangtao");
        return this.getSqlSession().selectList("user.selectAll",paramMap);
    }

    @Override
    public LoginUser findLoginUserByUserName(String userName) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("userName", userName);
        return this.getSqlSession().selectOne("user.findLoginUserByUserName", paramMap);
    }

    @Override
    public int addLoginUser(LoginUser loginUser) {
        return this.getSqlSession().insert("user.addLoginUser", loginUser);
    }

    @Override
    public int deleteLoginUserByUserName(String userName) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("userName", userName);
        return this.getSqlSession().delete("user.deleteLoginUserByUserName", paramMap);
    }

    @Override
    public int findLoginUserCountByOrgCode(String dept, List<String> depts) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        if(depts != null && depts.size() == 0){
            depts.add("-1");
        }
        paramMap.put("dept", dept);
        paramMap.put("depts", depts);
        return this.getSqlSession().selectOne("user.findLoginUserCountByOrgCode", paramMap);
    }

    @Override
    public SessionUser findStudentInfoByUserName(String userName) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("userName", userName);
        return this.getSqlSession().selectOne("user.findStudentInfoByUserName", paramMap);
    }

    @Override
    public SessionUser findTeacherInfoByUserName(String userName) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("userName", userName);
        return this.getSqlSession().selectOne("user.findTeacherInfoByUserName", paramMap);
    }

    @Override
    public List<Teacher> findTeachersByOrgCode(String orgCode) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("orgCode", orgCode);
        return this.getSqlSession().selectList("user.findTeacherInfoByOrgCode", paramMap);
    }
}
