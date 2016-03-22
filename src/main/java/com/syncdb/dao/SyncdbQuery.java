package com.syncdb.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.*;
import java.util.ArrayList;
import java.util.Map;

/**
 * SyncdbQuery.
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */
@Component("syncdbQuery")
public class SyncdbQuery implements ISyncdbQuery {

    /**
     * 连接对象
     */
    @Autowired
    private ISyncdbConnection syncdbConn;

    /**
     * 日志对象
     */
    private final Log logger = LogFactory.getLog(getClass());

    /**
     * 查询所有数据
     *
     * @param tableName 数据库表名
     * @param tableCls  数据库表对应的实体Class名
     * @return ArrayList
     */
    @Override
    public ArrayList<SyncdbTable> selectAll(String tableName, String tableCls) {
        String sql = this.genSelectAllSQL(tableName);
        ArrayList rowList = null;
        ResultSet rs = null;
        Statement stmt = null;
        try {
            Connection conn = syncdbConn.getConn();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            genQueryResult(rs, tableCls);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            logger.debug("执行查询语句：" + sql);
            try {
                if (null != rs) rs.close();
                if (null != stmt) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            syncdbConn.closeConn();
        }
        return rowList;
    }

    /**
     * 根据条件查询数据
     *
     * @param query    查询条件
     * @param tableCls 数据库表对应的实体Class名
     * @return ArrayList
     */
    @Override
    public ArrayList<SyncdbTable> select(String tableName, Map query, String tableCls) {
        String sql = null;
        Class tableClass = null;
        try {
            tableClass = Class.forName(tableCls);
            sql = this.genSelectSQL(tableName, tableClass);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (sql == null || tableClass == null) return null;
        ArrayList rowList = null;
        ResultSet rs = null;
        PreparedStatement stmt = null;
        try {
            Connection conn = syncdbConn.getConn();
            stmt = conn.prepareStatement(sql);
            genPreparedStmtVal(query, stmt, tableClass);
            rs = stmt.executeQuery(sql);
            genQueryResult(rs, tableCls);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            logger.debug("执行查询语句：" + sql);
            try {
                if (null != rs) rs.close();
                if (null != stmt) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            syncdbConn.closeConn();
        }
        return rowList;
    }

    /**
     * 生成查询所有数据的SQL语句
     *
     * @param tableName 表名
     * @return String SQL语句
     */
    private String genSelectAllSQL(String tableName) {
        return "select * from " + tableName;
    }

    /**
     * 生成根据条件查询数据的SQL语句
     *
     * @param tableName  表名
     * @param tableClass 表所对应的实体类Class对象
     * @return String SQL
     */
    private String genSelectSQL(String tableName, Class tableClass) {
        String prefix = "select * from " + tableName + " where 1 = 1 ";
        Field[] tableFieldArr = tableClass.getFields();
        String suffix = "";
        for (Field field : tableFieldArr) {
            String name = field.getName();
            suffix += " and " + name + " =? ";
        }
        String sql = prefix + suffix;
        logger.debug("生成查询语句：" + sql);
        return sql;
    }

    /**
     * 将结果集自动转换成数据库查询结果列表
     *
     * @param rs       查询出来的ResultSet对象
     * @param tableCls 查询的数据表对应的实体类Class名
     * @return
     * @throws Exception
     */
    private ArrayList genQueryResult(ResultSet rs, String tableCls) throws Exception {
        ArrayList rowList = new ArrayList();
        while (rs.next()) {
            Class rowCls = Class.forName(tableCls);
            Field[] fieldArr = rowCls.getFields();
            Object row = rowCls.newInstance();
            for (Field field : fieldArr) {
                String fieldName = field.getName();
                Class fieldTypeCls = field.getType();
                Object value = rs.getObject(fieldName, fieldTypeCls);
                String setMethodName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
                Method setMethod = rowCls.getMethod(setMethodName, fieldTypeCls);
                setMethod.invoke(row, value);
            }
            rowList.add(row);
        }
        return rowList;
    }

    /**
     * 设置PreparedStatement的值
     *
     * @param queryMap   查询条件
     * @param stmt       PreparedStatement对象
     * @param tableClass 查询的数据表对应的实体类Class
     * @throws java.sql.SQLException
     */
    private void genPreparedStmtVal(Map queryMap, PreparedStatement stmt, Class tableClass) throws SQLException {
        Field[] fieldArr = tableClass.getFields();
        int i = 1;
        for (Field field : fieldArr) {
            String fieldName = field.getName();
            Object queryValue = queryMap.get(fieldName);
            stmt.setObject(i, queryValue);
            i++;
        }
    }
}
