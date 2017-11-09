package org.iusp.common.service;

import org.iusp.common.bean.OrganizationTree;

import java.util.List;

/**
 * Created by tao on 2017/10/19.
 */
public interface OrganizationService {
    List<OrganizationTree> queryOrgTreeListByParentCode(String id);
}
