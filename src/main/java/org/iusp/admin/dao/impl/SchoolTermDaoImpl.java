package org.iusp.admin.dao.impl;

import org.iusp.admin.bean.SchoolTermBean;
import org.iusp.admin.dao.SchoolTermDao;
import org.iusp.base.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SchoolTermDaoImpl extends BaseDao implements SchoolTermDao {

    @Override
    public List<SchoolTermBean> queryForPage(SchoolTermBean bean) {

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("schoolYear", bean.getSchoolYear());
        List<SchoolTermBean> SchoolTermBeans = this.getSqlSession().selectList("schollTerm.queryForPage", paramMap);
        return SchoolTermBeans;
    }
}
