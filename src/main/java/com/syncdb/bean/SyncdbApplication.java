package com.syncdb.bean;

import org.jumpmind.symmetric.web.ServerSymmetricEngine;
import org.jumpmind.symmetric.web.SymmetricEngineHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 存放服务器信息.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/15
 */
@Component("syncdbApp")
public class SyncdbApplication {
    /**
     * 数据同步引擎名
     */
    public static final String ENGINE_NAME = "dbtool";

    /**
     * 主库组ID
     */
    public static final String ENGINE_SERVER_GROUP = "master";

    /**
     * 从库组ID
     */
    public static final String ENGINE_CLIENT_GROUP = "slaver";

    @Autowired
    private SymmetricEngineHolder engHolder;

    /**
     * 获取引擎操作对象
     * @return SymmetricEngineHolder
     */
    public SymmetricEngineHolder getEngHolder () {
        return this.engHolder;
    }

    /**
     * 获取引擎对象
     * @return ServerSymmetricEngine
     */
    public ServerSymmetricEngine getEngine () {
        return this.engHolder.getEngines().get(SyncdbApplication.ENGINE_NAME);
    }

    /**
     * 引擎是否启动
     * @return boolean
     */
    public boolean isEngStarted () {
        return null != this.getEngine() && this.getEngine().isStarted();
    }


}
