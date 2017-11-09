package org.iusp.base.model;

import java.io.Serializable;

public class MessageBean implements Serializable {

	//是否成功
	private boolean success;
	//返回消息
	private Object msg;
	//其他对象
	private Object other;
	public Object getOther() {
		return other;
	}

	public void setOther(Object other) {
		this.other = other;
	}

	public MessageBean(boolean success)
	{
		this.success = success;
	}
	
	public MessageBean(boolean success, Object msg, Object other)
	{
		this.success = success;
		this.msg = msg;
		this.other = other;
	}
	
	public MessageBean(boolean success, Object msg)
	{
		this.success = success;
		this.msg = msg;
	}
	public MessageBean(Object other)
	{
		this.other = other;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public Object getMsg() {
		return msg;
	}
	public void setMsg(Object msg) {
		this.msg = msg;
	}
}
