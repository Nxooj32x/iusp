package org.iusp.common.dao;

import org.iusp.common.bean.Software;

import java.util.List;

/**
 * Created by tao on 2017/10/18.
 */
public interface SoftwareDao {
    List<Software> querySoftwareByLimit();

    List<Software> querySoftwareForPage(Software software);

    int addSoftware(Software software);

    int deleteSoftwareById(int i);
}
