package org.iusp.base.dao.impl.xml;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.iusp.base.common.util.BaseUtil;
import org.iusp.base.common.util.XmlUtil;
import org.iusp.base.dao.ConfigDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigImplDao implements ConfigDao {
	
	private static final Logger logger = LoggerFactory.getLogger(ConfigImplDao.class);

	/**
	 * @deprecated
	 */
	private static HashMap<String, String> configFile;

	public static final String defaultBasePath = "/etc/soulinfo/xmlconfig";

	private String basePath;

	/**
	 * @deprecated
	 */
	public static HashMap<String, String> getConfigFile() {
		return configFile;
	}
	/**
	 * @deprecated
	 */
	public static void setConfigFile(HashMap<String, String> configFile) {
		ConfigImplDao.configFile = configFile;
	}

	@Override
	public Object getConfigByNameDao(String configName) throws Exception {
		return getConfigByNameDao(configName, Object.class, "default");
	}

	@Override
	public void updateConfigDao(String configName, Object obj)
			throws Exception {
		updateConfigDao(configName, obj, "default");
	}

	@Override
	public void updateConfigDao(String configName, Object obj, String ns)
			throws Exception {
		String path = getBasePath() + File.separator + configName
				+ File.separator + ns;
		
		try {
			XmlUtil.writeToXmlFile(path, obj);
		} catch (Exception e) {
			throw new Exception(e);
		}

	}

	@Override
	public Object getConfigByNameDao(String configName, Class<?> c)
			throws Exception {
		return getConfigByNameDao(configName, c, "default");
	}

	@Override
	public Object getConfigByClassDao(Class<?> c) throws Exception {
		String name = c.getSimpleName();
		return getConfigByNameDao(name, c);
	}

	@Override
	public Object getConfigByClassDao(Class<?> c, String ns)
			throws Exception {
		String name = c.getSimpleName();
		return getConfigByNameDao(name, c, ns);
	}

	@Override
	public Object getConfigByNameDao(String configName, Class<?> c, String ns)
			throws Exception {
		Object object = null;
		String path = getBasePath() + File.separator + configName
				+ File.separator + ns;
		try {
			object = XmlUtil.readObjectFromXmlFile(path, c);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return object;
	}
	
	
	@Override
	public List<Object> getConfigListByTypeDao(String configName, Class<?> c)
			throws Exception {
		List<Object> list = new ArrayList<Object>();
		Object object = null;
		String path = getBasePath() + File.separator + configName
				+ File.separator;
		File dir = new File(path);
		if (dir.exists() && dir.isDirectory()) {
			File[] files = dir.listFiles();
			for (File file : files) {
				try {
					object = XmlUtil.readObjectFromXmlFile(file.getPath(), c);
					list.add(object);
				} catch (Exception e) {
					logger.warn(e.getLocalizedMessage());
				}
			}
		}
		return list;
	}
	
	
	@Override
	public boolean removeConfigDao(String configName, String ns)
			throws Exception {
		String path = getBasePath() + File.separator + configName
				+ File.separator + ns;
		boolean ret = false;
		File file = new File(path);
		if (file.isFile()) {
			ret = file.delete();
		}
		return ret;
	}

	public String getBasePath() {
		if (basePath == null)
			basePath = defaultBasePath;
		else if (basePath.startsWith("classpath")) {
			basePath = BaseUtil.getClassPath()
					+ basePath.substring(basePath.indexOf(":") + 1);
		}
		return basePath;
	}
	
	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}


}
