package org.iusp.admin.service;

import com.github.pagehelper.PageInfo;
import org.iusp.admin.bean.SchoolTermBean;

/**
 * Created by tao on 2017/10/19.
 */
public interface SchoolTermService {
    PageInfo<SchoolTermBean> queryForPage(SchoolTermBean bean, Integer pageNumber, Integer pageSize);
}
