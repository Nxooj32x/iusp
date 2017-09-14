package org.iusp.base;

import java.io.Serializable;

public class BaseEntity implements Serializable {
	public int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}