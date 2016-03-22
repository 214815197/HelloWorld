package com.syncdb.service;

import com.syncdb.bean.SyncdbApplication;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jumpmind.symmetric.web.SymmetricEngineHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.WebApplicationContextUtils;
import javax.servlet.ServletContext;


/**
 * 同步工具状态业务逻辑
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/2/28
 */
@Service("symService")
public class SymService implements ISymService {

    @Autowired
    private SyncdbApplication syncdbApp;

    protected final Log logger = LogFactory.getLog(getClass());

    /**
     * 启动同步服务
     *
     * @return ISymService
     */
    @Override
    public ISymService start(ServletContext ctx) {
        SymmetricEngineHolder engHolder = syncdbApp.getEngHolder();
        String autoStart = ctx.getInitParameter("autoStart");
        engHolder.setAutoStart(autoStart == null ? true : autoStart.equalsIgnoreCase("true"));
        String autoCreate = ctx.getInitParameter("autoCreate");
        engHolder.setAutoCreate(autoCreate == null ? true : autoCreate.equalsIgnoreCase("true"));
        String multiServerMode = ctx.getInitParameter("multiServerMode");
        engHolder.setMultiServerMode(multiServerMode != null && multiServerMode.equalsIgnoreCase("true"));
        engHolder.setSingleServerPropertiesFile(ctx.getInitParameter("singleServerPropertiesFile"));
        String staticEnginesMode = ctx.getInitParameter("staticEnginesMode");
        engHolder.setStaticEnginesMode(staticEnginesMode != null && staticEnginesMode.equalsIgnoreCase("true"));
        engHolder.setDeploymentType(ctx.getInitParameter("deploymentType"));
        ctx.setAttribute("symmetricEngineHolder", engHolder);
        String useWebApplicationContext = ctx.getInitParameter("useWebApplicationContext");
        if("true".equals(useWebApplicationContext)) {
            engHolder.setSpringContext(WebApplicationContextUtils.getWebApplicationContext(ctx));
        }
        logger.info("启动数据库同步服务。");
        engHolder.start();
        return this;
    }

    /**
     * 停止同步服务
     *
     * @return ISymService
     */
    @Override
    public ISymService stop() {
        if (!syncdbApp.isEngStarted()) return this;
        logger.info("停止数据库同步服务。");
        syncdbApp.getEngHolder().stop();
        return this;
    }
}
