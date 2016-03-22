package com.syncdb.service;

import javax.servlet.ServletContext;
import java.util.Map;

/**
 * Symmetricds操作接口
 * @Author Yao<yaogaoyu@qq.com>
 */
public interface ISymService {
    /**
     * 启动同步服务
     *
     * @return ISymService
     */
    public ISymService start(ServletContext ctx);

    /**
     * 停止同步服务
     *
     * @return ISymService
     */
    public ISymService stop();

}
