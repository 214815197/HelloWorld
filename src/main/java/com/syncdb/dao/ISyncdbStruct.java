package com.syncdb.dao;

import java.util.Map;

/**
 * 查询表结构.
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */
public interface ISyncdbStruct {
    /**
     * 获取数据库表, 过滤sym自动创建的表
     * @return String[] 表名
     */
    public String[] getTables();

    /**
     * 根据表名获取表结构
     * @param tableName 表名
     * @return Map<字段，字段类型>
     */
    public Map<String, String> getFields(String tableName);
}
