package com.syncdb.dao;

import java.util.ArrayList;
import java.util.Map;

/**
 * 数据库查询接口.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
public interface ISyncdbQuery {
    /**
     * 查询所有数据
     *
     * @param tableName 数据库表名
     * @param tableCls  数据库表对应的实体Class名
     * @return ArrayList
     */
    public ArrayList<SyncdbTable> selectAll(String tableName, String tableCls);

    /**
     * 根据条件查询数据
     *
     * @param tableName 数据库表明
     * @param query     查询条件
     * @param tableCls  数据库表对应的实体Class名
     * @return ArrayList
     */
    public ArrayList<SyncdbTable> select(String tableName, Map query, String tableCls);
}
