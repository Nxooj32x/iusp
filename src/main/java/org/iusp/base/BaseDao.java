package org.iusp.base;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author dong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class BaseDao extends SqlSessionDaoSupport {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    private SqlSession batchSession;

    @PostConstruct
    public void SqlSessionFactory() {
        super.setSqlSessionFactory(sqlSessionFactory);
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @param statement
     * @param list
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public int batchInsert(String statement, List<?> list) {
        batchSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        int i = 0;
        for (int cnt = list.size(); i < cnt; i++) {
            batchSession.insert(statement, list.get(i));
            if ((i + 1) % 1000 == 0) {// 1000为批量提交的条数
                batchSession.flushStatements();
            }
        }
        batchSession.flushStatements();
        batchSession.close();
        return i;
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @param statement
     * @param list
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public int batchUpdate(String statement, List<?> list) {
        batchSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        int i = 0;
        for (int cnt = list.size(); i < cnt; i++) {
            batchSession.update(statement, list.get(i));
            if ((i + 1) % 1000 == 0) {
                batchSession.flushStatements();
            }
        }
        batchSession.flushStatements();
        batchSession.close();
        return i;
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @param statement
     * @param list
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public int batchDelete(String statement, List<?> list) {
        batchSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        int i = 0;
        for (int cnt = list.size(); i < cnt; i++) {
            batchSession.delete(statement, list.get(i));
            if ((i + 1) % 1000 == 0) {
                batchSession.flushStatements();
            }
        }
        batchSession.flushStatements();
        batchSession.close();
        return i;
    }
}
