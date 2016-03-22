package com.syncdb.dao;
/**
 * dao层接口.
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */
public interface ISyncdbTable {
    /**
     * 获取表名
     * @return 表名
     * */
    public String gN();
    /**
     * 根据字段值更新数据库
     * @param tableCls 数据库对应的实体类Class对象
     * @return 被更新的最新数据
     * */
    public ISyncdbTable update(Class tableCls);
    /**
     * 根据字段值插入数据库
     * @param tableCls 数据库对应的实体类Class对象
     * @return 插入的最新数据
     * */
    public ISyncdbTable insert(Class tableCls);
    /**
     * 根据字段值删除数据库
     * @param tableCls 数据库对应的实体类Class对象
     * @return 被删除的数据
     * */
    public ISyncdbTable del(Class tableCls);

}
