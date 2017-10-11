/**
 * @Title: BaseUtil.java
 * @Package com.soulinfo.commons.util
 * @Description: 基础工具类
 * CopyRright (c) 2014-2015 SOUL
 * Company:无锡众志和达数据计算股份有限公司
 * 
 * @author xingweiwei
 * @date 2015年5月19日 下午3:05:54
 * @version V0.0.1
 */
package org.iusp.base.common.util;

import java.net.URISyntaxException;

/**
 * 基础工具类
 * 
 * @author guodong
 * 
 */
public class BaseUtil {

	/**
	 * 获取路径
	 * 
	 * @return 路径
	 */
	public static String getClassPath() {
		try {
			return Thread.currentThread().getContextClassLoader()
					.getResource("").toURI().getPath();
		} catch (URISyntaxException e) {
			return Thread.currentThread().getContextClassLoader()
					.getResource("").getFile();
		}
	}

}