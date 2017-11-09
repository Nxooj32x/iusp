package org.iusp.admin.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.iusp.admin.bean.SchoolTermBean;
import org.iusp.admin.dao.SchoolTermDao;
import org.iusp.admin.service.SchoolTermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolTermServiceImpl implements SchoolTermService {

    @Autowired
    private SchoolTermDao schoolTermDao;

    @Override
    public PageInfo<SchoolTermBean> queryForPage(SchoolTermBean bean, Integer pageNumber, Integer pageSize) {
        PageHelper.startPage(pageNumber,pageSize);
        List<SchoolTermBean> articles = schoolTermDao.queryForPage(bean);
        PageInfo pageInfo = new PageInfo(articles);
        return pageInfo;
    }
}
