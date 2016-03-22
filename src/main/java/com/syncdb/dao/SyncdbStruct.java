package com.syncdb.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Map;

/**
 * 获取数据库表信息Dao.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/12
 */
public class SyncdbStruct implements ISyncdbStruct {
    /**
     * 连接对象
     */
    private ISyncdbConnection conn ;

    /**
     * 日志对象
     */
    private final Log logger = LogFactory.getLog(getClass());

    /**
     * 构造方法
     * @param conn 连接对象
     */
    public SyncdbStruct (ISyncdbConnection conn) {
        this.conn = conn;
    }

    /**
     * 获取数据库表, 过滤sym自动创建的表
     *
     * @return String[] 表名
     */
    @Override
    public String[] getTables() {
        logger.info("获取数据库表列表");
//        conn.getConn().getMetaData().getTables();
        return new String[0];
    }

    /**
     * 根据表名获取表结构
     *
     * @param tableName 表名
     * @return Map<字段，字段类型>
     */
    @Override
    public Map<String, String> getFields(String tableName) {
        return null;
    }
}
