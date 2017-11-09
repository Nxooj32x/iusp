package org.iusp.admin.dao;

import org.iusp.admin.bean.SchoolTermBean;

import java.util.List;

/**
 * Created by tao on 2017/10/19.
 */
public interface SchoolTermDao {
    List<SchoolTermBean> queryForPage(SchoolTermBean bean);
}
