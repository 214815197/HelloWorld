package com.syncdb.dao;

/**
 * Dao层超类.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
public abstract class SyncdbTable implements ISyncdbTable {

    /**
     * 连接对象
     */
    private ISyncdbConnection conn ;

    /**
     * 构造方法
     * @param conn 连接对象
     */
    public SyncdbTable (ISyncdbConnection conn) {
        this.conn = conn;
    }
    /**
     * 根据字段值更新数据库
     *
     * @param tableCls 数据库表对应的实体类Class对象
     * @return 被更新的最新数据
     */
    @Override
    public ISyncdbTable update(Class tableCls) {
        return null;
    }

    /**
     * 根据字段值插入数据库
     *
     * @param tableCls 数据库表对应的实体类Class对象
     * @return 插入的最新数据
     */
    @Override
    public ISyncdbTable insert(Class tableCls) {
        return null;
    }

    /**
     * 根据字段值删除数据库
     *
     * @param tableCls 数据库表对应的实体类Class对象
     * @return 被删除的数据
     */
    @Override
    public ISyncdbTable del(Class tableCls) {
        return null;
    }

}
