package org.iusp.common.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.iusp.common.bean.Software;
import org.iusp.common.dao.SoftwareDao;
import org.iusp.common.service.SoftwareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoftwareServiceImpl implements SoftwareService {
    @Autowired
    private SoftwareDao softwareDao;

    @Override
    public List<Software> querySoftwareByLimit(int i) {
        PageHelper.startPage(1, i);
        List<Software> softwares = softwareDao.querySoftwareByLimit();
        PageInfo pageInfo = new PageInfo(softwares);
        return  pageInfo.getList();
    }

    @Override
    public PageInfo querySoftwareForPage(Software software, Integer pageNumber, Integer pageSize) {
        PageHelper.startPage(pageNumber,pageSize);
        List<Software> Softwares =  softwareDao.querySoftwareForPage(software);
        PageInfo pageInfo = new PageInfo(Softwares);
        return pageInfo;
    }

    @Override
    public int addSoftware(Software software) {
        return softwareDao.addSoftware(software);

    }

    @Override
    public int deleteSoftwareById(int i) {
        return softwareDao.deleteSoftwareById(i);
    }
}
