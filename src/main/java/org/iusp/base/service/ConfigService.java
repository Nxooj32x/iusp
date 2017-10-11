package org.iusp.base.service;

public interface ConfigService {
	
	/**
	 * 根据配置名获取配置对象
	 * @param configName	配置名称
	 * @param c		    	配置类
	 * @return				配置对象
	 */
	Object getConfigObject(String configName, Class<?> c) throws Exception;
	
	/**
	 * 根据配置类获取配置对象
	 * @param c		    	配置类
	 * @return				配置对象
	 */
	Object getConfigObject(Class<?> c) throws  Exception;
	
	/**
	 * 根据配置类型和命名空间，获取配置对象
	 * @param c		    	配置类
	 * @param ns	    	命名空间
	 * @return				配置对象
	 */
	Object getConfigObject(Class<?> c, String ns) throws Exception;
	
	/**
	 * 根据配置类型和命名空间，获取配置对象
	 * @param configName	配置名称
	 * @param c		    	配置类
	 * @param ns	    	命名空间
	 * @return				配置对象
	 */
	Object getConfigObject(String configName, Class<?> c, String ns) throws Exception;

}
