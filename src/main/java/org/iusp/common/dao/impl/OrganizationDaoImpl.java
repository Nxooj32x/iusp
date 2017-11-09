package org.iusp.common.dao.impl;

import org.iusp.base.BaseDao;
import org.iusp.common.bean.Organization;
import org.iusp.common.dao.OrganizationDao;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OrganizationDaoImpl extends BaseDao implements OrganizationDao {

    @Override
    public List<Organization> queryOrgListByParentCode(String parentCode) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("parentCode", parentCode);
        return this.getSqlSession().selectList("org.queryOrgListByParentCode", paramMap);
    }
}
