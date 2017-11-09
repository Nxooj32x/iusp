package org.iusp.common.dao;

import org.iusp.common.bean.Organization;

import java.util.List;

/**
 * Created by tao on 2017/10/19.
 */
public interface OrganizationDao {
    List<Organization> queryOrgListByParentCode(String parentCode);
}
