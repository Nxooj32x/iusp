/**
 * @Title: XmlUtil.java
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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class XmlUtil {

	private static final Logger logger = LoggerFactory.getLogger(XmlUtil.class);

	/**
	 * 写对象到xml文件
	 * 
	 * @param path
	 *            文件路径
	 * @param obj
	 *            对象
	 * @throws Exception
	 *             工具类异常
	 */
	public static void writeToXmlFile(String path, Object obj)
			throws Exception {
		File file = new File(path);
		if (!file.exists()) {
			try {
				File parentFile = file.getParentFile();
				if (!parentFile.exists()) {  
					parentFile.mkdirs();  
	            } 
				file.createNewFile();
			} catch (IOException e) {
				throw new Exception(e);
			}
		}
		FileOutputStream os = null;
		FileChannel channel = null;
		FileLock lock = null;
		try {
			XmlMapper xmlMapper = new XmlMapper();
			os = new FileOutputStream(file);
			channel = os.getChannel();
			while (true) {
				try {
					lock = channel.tryLock();
					break;
				} catch (Exception e) {
					logger.debug("有其他线程正在操作该文件，当前线程休眠500毫秒");
					try {
						Thread.sleep(500);
					} catch (InterruptedException e1) {
						logger.warn(e.getLocalizedMessage());
					}
				}
			}
			xmlMapper.setSerializationInclusion(Include.NON_EMPTY);
			xmlMapper.writeValue(os, obj);
		} catch (FileNotFoundException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		} finally {
			try {
				if (lock != null)
					lock.release();
				if (channel != null)
					channel.close();
				if (os != null)
					os.close();
			} catch (IOException e) {
			}
		}
	}

	/**
	 * 格式化xml文件
	 * 
	 * @param path
	 *            文件路径
	 * @throws Exception
	 *             工具类异常
	 */
	public static void formatXmlFile(String path) throws Exception {
		File file = new File(path);
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				throw new Exception(e);
			}
		}
		FileInputStream fis = null;
		InputStreamReader fsr = null;
		BufferedReader br = null;
		FileOutputStream fos = null;
		OutputStreamWriter ow = null;
		FileChannel channel = null;
		FileLock lock = null;

		try {
			fis = new FileInputStream(file);
			channel = fis.getChannel();
			while (true) {
				try {
					lock = channel.tryLock(0, Long.MAX_VALUE, true);
					break;
				} catch (Exception e) {
					logger.debug("有其他线程正在操作该文件，当前线程休眠500毫秒");
					try {
						Thread.sleep(500);
					} catch (InterruptedException e1) {
						logger.warn(e.getLocalizedMessage());
					}
				}
			}
			fsr = new InputStreamReader(fis);
			br = new BufferedReader(fsr);
			String content = "";
			String line = null;
			while ((line = br.readLine()) != null) {
				content = content + line;
			}
			;
			content = format(content);
			if (lock != null) {
				lock.release();
				lock = null;
			}
			if (channel != null) {
				channel.close();
				channel = null;
			}
			
			fos = new FileOutputStream(file);
			channel = fos.getChannel();
			while (true) {
				try {
					lock = channel.tryLock();
					break;
				} catch (Exception e) {
					logger.debug("有其他线程正在操作该文件，当前线程休眠500毫秒");
					try {
						Thread.sleep(500);
					} catch (InterruptedException e1) {
						logger.warn(e.getLocalizedMessage());
					}
				}
			}
			ow = new OutputStreamWriter(fos);
			ow.write(content, 0, content.length());
			ow.flush();
		} catch (FileNotFoundException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		} finally {
			try {
				if (lock != null) {
					lock.release();
					lock = null;
				}
				if (channel != null) {
					channel.close();
					channel = null;
				}
				if (br != null)
					br.close();
				if (fsr != null)
					fsr.close();
				if (fis != null)
					fis.close();
				if (ow != null)
					ow.close();
			} catch (IOException e) {
			}
		}
	}

	/**
	 * 格式化xml
	 * 
	 * @param unformattedXml
	 *            未格式化的xml字符串
	 * @return 格式化后的字符串
	 */
	public static String format(String unformattedXml) {
		Document document = null;
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			InputSource is = new InputSource(new StringReader(unformattedXml));
			document = db.parse(is);
		} catch (ParserConfigurationException e) {
			throw new RuntimeException(e);
		} catch (SAXException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		try {
			OutputFormat format = new OutputFormat(document);
			format.setLineWidth(65);
			format.setIndenting(true);
			Writer out = new StringWriter();
			XMLSerializer serializer = new XMLSerializer(out, format);
			serializer.serialize(document);
			return out.toString();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 从xml格式的字符串中读取对象
	 * 
	 * @param str
	 *            xml格式的字符串
	 * @param c
	 *            类
	 * @return 读取的对象
	 * @throws Exception
	 *             工具类异常
	 */
	public static Object readObjectFromXmlString(String str, Class<?> c)
			throws Exception {
		XmlMapper xmlMapper = new XmlMapper();
		try {
			Object obj = xmlMapper.readValue(str, c);
			return obj;
		} catch (JsonParseException e) {
			throw new Exception(e);
		} catch (JsonMappingException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		}
	}

	/**
	 * 从xml格式的文件中读取对象
	 * 
	 * @param path
	 *            文件路径
	 * @param c
	 *            类
	 * @return 读取的对象
	 * @throws Exception
	 *             工具类异常
	 */
	public static Object readObjectFromXmlFile(String path, Class<?> c)
			throws Exception {
		FileInputStream is = null;
		FileChannel channel = null;
		FileLock lock = null;
		try {
			XmlMapper xmlMapper = new XmlMapper();
			is = new FileInputStream(path);
			channel = is.getChannel();
			while (true) {
				try {
					lock = channel.tryLock(0, Long.MAX_VALUE, true);
					break;
				} catch (Exception e) {
					logger.debug("有其他线程正在操作该文件，当前线程休眠500毫秒");
					try {
						Thread.sleep(500);
					} catch (InterruptedException e1) {
						logger.warn(e.getLocalizedMessage());
					}
				}
			}
			Object object = xmlMapper.readValue(is, c);
			return object;
		} catch (FileNotFoundException e) {
			return null;
		} catch (IOException e) {
			throw new Exception(e);
		} finally {
			try {
				if (lock != null)
					lock.release();
				if (channel != null)
					channel.close();
				if (is != null)
					is.close();
			} catch (IOException e) {
			}
		}
	}
}
