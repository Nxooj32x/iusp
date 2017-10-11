package org.iusp.base.dao;

import java.util.List;

public interface ConfigDao {
	
	/**
	 * 根据配置名获取配置对象
	 * @param configName	配置名称
	 * @return	配置对象
	 */
	Object getConfigByNameDao(String configName) throws Exception;
	
	/**
	 * 根据配置类获取配置对象
	 * @param c				配置类
	 * @return	配置对象
	 */
	Object getConfigByClassDao(Class<?> c) throws Exception;

	/**
	 * 根据配置名和类型，获取配置对象
	 * @param configName	配置名称
	 * @param c				配置类
	 * @return				配置对象
	 * @throws Exception
	 */
	Object getConfigByNameDao(String configName, Class<?> c) throws Exception;

	/**
	 * 根据配置类型和命名空间，获取配置对象
	 * @param c			配置类
	 * @param ns		命名空间
	 * @return			配置对象
	 * @throws Exception
	 */
	Object getConfigByClassDao(Class<?> c, String ns) throws Exception;

	/**
	 * 根据配置类型和命名空间，获取配置对象
	 * @param configName	配置名称
	 * @param c				配置类
	 * @param ns			命名空间
	 * @return				配置对象
	 * @throws Exception
	 */
	Object getConfigByNameDao(String configName, Class<?> c, String ns) throws Exception;
	
	/**
	 * 根据配置类型获取所有配置对象
	 * @param configName	配置名称	
	 * @param c				配置类
	 * @return				配置对象列表
	 * @throws Exception
	 */
	List<Object> getConfigListByTypeDao(String configName, Class<?> c) throws Exception;
	
	/**
	 * 更新配置对象	未指定命名空间，更新到default
	 * @param configName	配置名称
	 * @param obj			配置对象
	 * @throws Exception
	 */
	void updateConfigDao(String configName, Object obj) throws Exception;
	
	/**
	 * 更新配置对象
	 * @param configName	配置名称
	 * @param obj			配置对象
	 * @param ns			命名空间
	 * @throws Exception
	 */
	void updateConfigDao(String configName, Object obj, String ns) throws Exception;
	
	
	/**
	 * 删除配置对象
	 * @param configName	配置名称
	 * @param ns			命名空间
	 * @return boolean 返回删除是否成功
	 * @throws Exception
	 */
	boolean removeConfigDao(String configName, String ns) throws Exception;

}
