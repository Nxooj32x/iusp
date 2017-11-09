package org.iusp.common.dao.impl;

import org.iusp.base.BaseDao;
import org.iusp.common.bean.Software;
import org.iusp.common.dao.SoftwareDao;
import org.iusp.utils.StringUtil;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SoftwareDaoImpl extends BaseDao implements SoftwareDao {
    @Override
    public List<Software> querySoftwareByLimit() {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        return this.getSqlSession().selectList("software.querySoftwareByLimit", paramMap);
    }

    @Override
    public List<Software> querySoftwareForPage(Software software) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("downName", StringUtil.trim(software.getDownName()));
        paramMap.put("uploader", software.getUploader());

        List<Software> list = this.getSqlSession().selectList("software.querySoftwareForPage", paramMap);
        return list;
    }

    @Override
    public int addSoftware(Software software) {
        return this.getSqlSession().insert("software.addSoftware", software);
    }

    @Override
    public int deleteSoftwareById(int i) {
        return this.getSqlSession().delete("software.deleteSoftwareById", i);
    }
}
