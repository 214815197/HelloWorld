package com.syncdb.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * SyncdbConnection.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
@Component("syncdbConn")
public class SyncdbConnection implements ISyncdbConnection {

    private final Log logger = LogFactory.getLog(getClass());
    /**
     * 数据库连接配置对象
     */
    @Autowired
    private DbConfigBean dbConfig;

    /**
     * 数据库连接对象
     */
    private Connection conn;

    /**
     * 获取数据库连接
     *
     * @return Connection
     * @throws ClassNotFoundException
     * @throws java.sql.SQLException
     */
    @Override
    public Connection getConn() throws ClassNotFoundException, SQLException {
        if (null == dbConfig) return null;
        Class.forName(dbConfig.getDriver());
        this.conn = DriverManager.getConnection(dbConfig.getUrl(), dbConfig.getUser(), dbConfig.getPsw());
        logger.debug("建立数据库连接");
        return this.conn;
    }

    /**
     * 关闭数据库连接
     *
     */
    @Override
    public void closeConn() {
        if (null == this.conn) return;
        try {
            this.conn.close();
        } catch (SQLException e) {
            logger.error("关闭数据库连接出错", e);
        }
        this.conn = null;
    }
}
