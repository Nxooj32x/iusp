package org.iusp.base.service.impl;

import org.iusp.base.dao.ConfigDao;
import org.iusp.base.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigImplService implements ConfigService {
	
	@Autowired
	private ConfigDao configDao;
	
	@Override
	public Object getConfigObject(String configName, Class<?> c) throws Exception{
		try {
			return configDao.getConfigByNameDao(configName, c);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public Object getConfigObject(Class<?> c) throws Exception {
		try {
			return configDao.getConfigByClassDao(c);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public Object getConfigObject(Class<?> c, String ns)
			throws Exception {
		try {
			return configDao.getConfigByClassDao(c, ns);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public Object getConfigObject(String configName, Class<?> c, String ns)
			throws Exception {
		try {
			return configDao.getConfigByNameDao(configName, c);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

}
