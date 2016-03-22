package com.syncdb.listener;

import com.syncdb.bean.SyncdbApplication;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jumpmind.symmetric.web.SymmetricEngineHolder;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

/**
 * 控制服务器初始化和关闭时候的动作.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/12
 */
public class DBToolListener implements ServletContextListener{
    protected final Log logger = LogFactory.getLog(getClass());

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        if (null == this.getClass().getClassLoader().getResource("symmetric.properties")) return;
        String filePath = this.getClass().getClassLoader().getResource("symmetric.properties").getPath();
        File file = new File(filePath);
        if (file.exists()) {
            try {
                ServletContext ctx = servletContextEvent.getServletContext();
                Properties symProp = new Properties();
                symProp.load(new FileInputStream(file));
                Set keySet = symProp.keySet();
                Iterator it = keySet.iterator();
                while(it.hasNext()){
                    String key = (String)it.next();
                    ctx.setAttribute(key, symProp.get(key));
                    System.getProperties().put(key, symProp.get(key));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        ServletContext ctx = servletContextEvent.getServletContext();
        SymmetricEngineHolder engHolder = (SymmetricEngineHolder)servletContextEvent.getServletContext().getAttribute("symmetricEngineHolder");
        if (null != engHolder && engHolder.getEngines().get(SyncdbApplication.ENGINE_NAME).isStarted()) {
            logger.info("停止数据库同步服务。");
            ((SymmetricEngineHolder)engHolder).stop();
        }
    }
}
