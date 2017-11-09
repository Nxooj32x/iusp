package org.iusp.common.service;

import com.github.pagehelper.PageInfo;
import org.iusp.common.bean.Software;

import java.util.List;

/**
 * Created by tao on 2017/10/18.
 */
public interface SoftwareService {
    List<Software> querySoftwareByLimit(int i);

    PageInfo querySoftwareForPage(Software software, Integer pageNumber, Integer pageSize);

    int addSoftware(Software software);

    int deleteSoftwareById(int i);
}
