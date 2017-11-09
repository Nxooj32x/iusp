package org.iusp.admin.bean;

import java.util.Date;

public class SchoolTermBean {

	private Integer id;
	private Date schoolYear;
	private String schoolTerm;
	private Date schoolOpeanDate;
	private Date schoolCloseDate;
	
	public Date getSchoolYear() {
		return schoolYear;
	}
	public void setSchoolYear(Date schoolYear) {
		this.schoolYear = schoolYear;
	}
	public String getSchoolTerm() {
		return schoolTerm;
	}
	public void setSchoolTerm(String schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public Date getSchoolOpeanDate() {
		return schoolOpeanDate;
	}
	public void setSchoolOpeanDate(Date schoolOpeanDate) {
		this.schoolOpeanDate = schoolOpeanDate;
	}
	public Date getSchoolCloseDate() {
		return schoolCloseDate;
	}
	public void setSchoolCloseDate(Date schoolCloseDate) {
		this.schoolCloseDate = schoolCloseDate;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}


}
