package com.syncdb.dao;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * 获取数据库连接.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
public interface ISyncdbConnection {
    /**
     * 获取数据库连接
     *
     * @return Connection
     * @throws ClassNotFoundException
     * @throws java.sql.SQLException
     */
    public Connection getConn() throws ClassNotFoundException, SQLException;

    /**
     * 关闭数据库连接
     *
     * @throws java.sql.SQLException
     */
    public void closeConn();

}
