package org.iusp.common.bean;


import java.io.Serializable;
import java.util.Date;

/**
 * 用户信息
 * @author guodong
 *
 */
public class User implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3084343337864236055L;
	/**
	 * 用户状态：正常
	 */
	public static final int USER_STATUS_ACTIVE = 0;
	/**
	 * 用户状态：锁定
	 */
	public static final int USER_STATUS_UNACTIVE = 1;
	/**
	 * 用户状态：停用
	 */
	public static final int USER_STATUS_UNUSED = 2;
	
	public static final String USER_EMAIL_ACTIVE = "0";//邮箱已激活
	
	public static final String USER_EMAIL_UNACTIVE = "1";//邮箱未激活
	
	/**用户ID*/
	private int id;
	/**登陆名*/
	private String realName;

	private String userName;

	private String roleCode;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	/**密码*/
	private String password;
	/**邮箱*/
	private String email;	
	/**用户状态 
	 * 可选值为：
	 * 		USER_STATUS_ACTIVE 0
	 * 		USER_STATUS_UNACTIVE 1
	 * 		USER_STATUS_UNUSED 2
	 * 		其他自定义状态
	 */
	private int status;
	/**用户属于注册于哪个APP*/
	private String registAppId;
	/**注册时间*/
	private Date registdate;
	/**修改时间*/
	private Date updatedate;
	/**预留字段1*/
	private String field1;
	/**预留字段2*/
	private String field2;
	/**预留字段3*/
	private String field3;
	/**账号类型
	 * app/user
	 * 
	 * */
	private String type;
	
	/**账号来源
	 * register/system
	 * 
	 * */
	private String source;
	/**
	 * 手机号码
	 */
	private String mobilePhone;
	/**
	 * 手机激活状态【0：激活，1：未激活，2：停用】
	 */
	private String phoneState;
	/**
	 * 邮箱激活状态【0：激活，1：未激活，2：停用】
	 */
	private String emailState;
	
	public Integer getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getRegistdate() {
		return registdate;
	}
	public void setRegistdate(Date registdate) {
		this.registdate = registdate;
	}
	public Date getUpdatedate() {
		return updatedate;
	}
	public void setUpdatedate(Date updatedate) {
		this.updatedate = updatedate;
	}

	public String getField1() {
		return field1;
	}
	public void setField1(String field1) {
		this.field1 = field1;
	}
	public String getField2() {
		return field2;
	}
	public void setField2(String field2) {
		this.field2 = field2;
	}
	public String getField3() {
		return field3;
	}
	public void setField3(String field3) {
		this.field3 = field3;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getRegistAppId() {
		return registAppId;
	}
	public void setRegistAppId(String registAppId) {
		this.registAppId = registAppId;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	public String getPhoneState() {
		return phoneState;
	}
	public void setPhoneState(String phoneState) {
		this.phoneState = phoneState;
	}
	public String getEmailState() {
		return emailState;
	}
	public void setEmailState(String emailState) {
		this.emailState = emailState;
	}
}
