package org.iusp.common.service.impl;

import org.iusp.common.bean.*;
import org.iusp.common.dao.OrganizationDao;
import org.iusp.common.dao.UserDao;
import org.iusp.common.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrganizationDao organizationDao;

    @Override
    public List<OrganizationTree> queryOrgTreeListByParentCode(String parentCode) {

        List<OrganizationTree> treeList = new ArrayList<OrganizationTree>();

        if (!"00".equals(parentCode) && !"9000".equals(parentCode) && !"9001".equals(parentCode)
                && !"9002".equals(parentCode) && !"9003".equals(parentCode)) {
            List<Teacher> teacherList = userDao.findTeachersByOrgCode(parentCode);
            if (null != teacherList && !teacherList.isEmpty()) {
                for (Teacher teacher : teacherList) {
                    OrganizationTree tree = new OrganizationTree();
                    tree.setId(teacher.getId() + "");
                    tree.setPid("");
                    LoginUser user = userDao.findLoginUserByUserName(teacher.getUserName());
                    if (null != user) {
                        TreeFont font = new TreeFont();
                        font.setColor("blue");
                        // tree.setName("<span style='color:blue;font-weight:bold'>" + teacher.getRealName() +
                        // "</span>");
                        tree.setFont(font);
                    }
                    tree.setName(teacher.getRealName());
                    tree.setParent(false);
                    treeList.add(tree);
                }
            }
        } else {
            List<Organization> orgList = organizationDao.queryOrgListByParentCode(parentCode);
            if (null != orgList && !orgList.isEmpty()) {
                for (Organization organization : orgList) {
                    OrganizationTree tree = new OrganizationTree();
                    tree.setId(organization.getOrgCode());
                    tree.setPid(organization.getParentCode());
                    List<String> depts = new ArrayList<String>();
                    if("00".equals(parentCode)){
                        List<Organization> orgs = organizationDao.queryOrgListByParentCode(organization.getOrgCode());
                        for (Organization org : orgs) {
                            depts.add(org.getOrgCode());
                        }
                    } else {
                        depts.add(organization.getOrgCode());
                    }
                    int loginCount = userDao.findLoginUserCountByOrgCode("Y", depts);
                    tree.setName(organization.getOrgName() + "(" + /*loginCount*/0 + ")");
                    tree.setParent(true);
                    treeList.add(tree);
                }
            }
        }

        return treeList;
    }

    public void addListData( List<OrganizationTree> treeList ,String Code){
        List<Organization> organizations = organizationDao.queryOrgListByParentCode(Code);
        if (null != organizations && !organizations.isEmpty()) {
            for(Organization organization :organizations){
                OrganizationTree tree = new OrganizationTree();
                tree.setId(organization.getOrgCode());
                tree.setPid(organization.getParentCode());
                tree.setName(organization.getOrgName() + "(" + /*loginCount*/0 + ")");
                tree.setParent(true);
                treeList.add(tree);
                addListData(treeList,organization.getOrgCode());
            }
        }

    }
}
