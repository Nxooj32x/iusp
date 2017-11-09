package org.iusp.common.bean;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public class SessionUser implements Authentication  {
    private static final long serialVersionUID = 1L;
    public final static String CURRENT_USER = "sessionUser";
    private String userName;
    private String realName;
    private String roleCode;
    private String orgCode;
    private String orgName;
    private String orgType;
    private String orgTypeName;
    private String positionCode;
    private String positionName;
    private String isManager;

    private List<SessionUser> users;

    private String name;

    private String pwd;

    @Override
    public String getName() {
        return name;
    }
    //权限
    private Set<GrantedAuthority> accesses;

    /**
     * 获取权限
     */
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return accesses;
    }

    @Override
    public Object getCredentials() {
        return this.pwd;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.userName;
    }

    //判断是否验证
    private boolean authenticated=false;

    /**
     * 是否已验证
     */
    @Override
    public boolean isAuthenticated() {
        return this.authenticated;
    }

    @Override
    public void setAuthenticated(boolean arg0) throws IllegalArgumentException {
        this.authenticated=arg0;
    }

    public Set<GrantedAuthority> getAccesses() {
        return accesses;
    }

    public void setAccesses(Set<GrantedAuthority> accesses) {
        this.accesses = accesses;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public void setName(String name) {
        this.name = name;
    }



    /**
     * @return the roleCode
     */
    public String getRoleCode() {
        return roleCode;
    }

    /**
     * @param roleCode the roleCode to set
     */
    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    /**
     * @return the orgCode
     */
    public String getOrgCode() {
        return orgCode;
    }

    /**
     * @param orgCode the orgCode to set
     */
    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    /**
     * @return the orgName
     */
    public String getOrgName() {
        return orgName;
    }

    /**
     * @param orgName the orgName to set
     */
    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    /**
     * @return the positionCode
     */
    public String getPositionCode() {
        return positionCode;
    }

    /**
     * @param positionCode the positionCode to set
     */
    public void setPositionCode(String positionCode) {
        this.positionCode = positionCode;
    }

    /**
     * @return the positionName
     */
    public String getPositionName() {
        return positionName;
    }

    /**
     * @param positionName the positionName to set
     */
    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return the realName
     */
    public String getRealName() {
        return realName;
    }

    /**
     * @param realName the realName to set
     */
    public void setRealName(String realName) {
        this.realName = realName;
    }

    /**
     * @return the orgType
     */
    public String getOrgType() {
        return orgType;
    }

    /**
     * @param orgType the orgType to set
     */
    public void setOrgType(String orgType) {
        this.orgType = orgType;
    }

    /**
     * @return the orgTypeName
     */
    public String getOrgTypeName() {
        if ("01".equals(orgType)) {
            orgTypeName = "领导层";
        } else if ("02".equals(orgType)) {
            orgTypeName = "行政部门";
        } else if ("03".equals(orgType)) {
            orgTypeName = "直属部门";
        } else if ("04".equals(orgType)) {
            orgTypeName = "教学部门";
        }

        return orgTypeName;
    }

    /**
     * @param orgTypeName the orgTypeName to set
     */
    public void setOrgTypeName(String orgTypeName) {
        this.orgTypeName = orgTypeName;
    }

    /**
     * @return the isManager
     */
    public String getIsManager() {
        return isManager;
    }

    /**
     * @param isManager the isManager to set
     */
    public void setIsManager(String isManager) {
        this.isManager = isManager;
    }

    /**
     * @return the users
     */
    public List<SessionUser> getUsers() {
        return users;
    }

    /**
     * @param users the users to set
     */
    public void setUsers(List<SessionUser> users) {
        this.users = users;
    }
}
