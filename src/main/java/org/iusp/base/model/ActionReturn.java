package org.iusp.base.model;

import java.io.Serializable;

public class ActionReturn implements Serializable {
	private static final long serialVersionUID = -6144046583654047499L;
	
	/**
	 * 是否返回成功
	 */
	private Boolean success;
	
	/**
	 * 返回的对象
	 */
	private Object msg;

	public ActionReturn(boolean success, Object obj) {
		this.success = success;
		this.setMsg(obj);
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public Object getMsg() {
		return msg;
	}

	public void setMsg(Object msg) {
		this.msg = msg;
	}

}