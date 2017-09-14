package org.iusp.common.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

public class User implements Authentication {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private String name;
	
	private String pwd;
	
	private String loginName;
	
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
		return null;
	}

	@Override
	public Object getDetails() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		return this.loginName;
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

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
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


}