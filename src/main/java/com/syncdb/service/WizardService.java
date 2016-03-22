package com.syncdb.service;

import com.syncdb.bean.SyncdbApplication;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 配置向导业务逻辑.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/6
 */
@Service("wizardService")
public class WizardService implements IWizardService {
    /**
     * 配置信息
     */
    private Properties symProp;

    @Autowired
    private SyncdbApplication syncdbApp;

    protected final Log logger = LogFactory.getLog(getClass());

    /**
     * 根据数据库类型设置对应的测试sql语句
     */
    private static final Map<String, String> DB_VALIDATION_REFS = new HashMap<String, String>();
    {
        DB_VALIDATION_REFS.put("Mysql", "select 1");
        DB_VALIDATION_REFS.put("Oracle", "select 1 from dual");
        DB_VALIDATION_REFS.put("DB2", "select max(1) from syscat.datatypes");
        DB_VALIDATION_REFS.put("SQL Server", "select 1");
    }

    /**
     * 构造方法
     */
    public WizardService () {
        this.symProp = new Properties();
    }

    /**
     * 保存向导中设置的数据
     *
     * @param key
     * @param val
     */
    @Override
    public Properties saveProps(String key, String val) {
        symProp.put(key, val);
        return symProp;
    }

    /**
     * 检测是否需要进行配置向导
     *
     * @return boolean 是否需要引导
     */
    @Override
    public boolean needWizard() {
        if (null == this.getClass().getClassLoader().getResource("symmetric.properties")) return true;
        String filePath = this.getClass().getClassLoader().getResource("symmetric.properties").getPath();
        File file = new File(filePath);
        return !file.exists();
    }

    /**
     * 测试数据库连接
     *
     * @return boolean 是否连接成功
     */
    @Override
    public boolean testConnection() {
        logger.info("测试数据库连接");
        String driver = (String) symProp.get("db.driver");
        String url = (String) symProp.get("db.url");
        String user = (String) symProp.get("db.user");
        String psw = (String) symProp.get("db.password");
        String validationQuery = DB_VALIDATION_REFS.get(symProp.get("db.type"));
        validationQuery = StringUtils.isBlank(validationQuery) ? DB_VALIDATION_REFS.get("mysql") : validationQuery;
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName(driver);
            conn = DriverManager.getConnection(url, user, psw);
            stmt = conn.createStatement();
            boolean isSuc = stmt.execute(validationQuery);
            return isSuc;
        } catch (SQLException e) {
            logger.error("测试数据库连接出错", e);
        } catch (ClassNotFoundException e) {
            logger.error("测试数据库连接出错", e);
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    /**
     * 设置用户名密码
     *
     * @param name 用户名
     * @param psw  密码
     */
    @Override
    public void genUser(String name, String psw) {

    }

    /**
     * 生成节点配置文件
     *
     * @return Properties 配置对象
     */
    @Override
    public Properties genConfigFile() {
        saveProps("engine.name", "dbtool");
        saveProps("rest.api.enable", "true");
        saveProps("file.sync.enable", "false");
        saveProps("auto.config.registration.svr.sql.script", "/symmetric-profile-standard-2-tier-config.sql");
        boolean isMasterNode = SyncdbApplication.ENGINE_SERVER_GROUP.equalsIgnoreCase((String)symProp.get("group.id"));
        saveProps("external.id", isMasterNode ? SyncdbApplication.ENGINE_SERVER_GROUP : getHostName());
        String validationQuery = DB_VALIDATION_REFS.get(symProp.get("db.type"));
        validationQuery = StringUtils.isBlank(validationQuery) ? DB_VALIDATION_REFS.get("mysql") : validationQuery;
        saveProps("db.validation.query", validationQuery);
        OutputStream writer = null;
        try {
            String filePath = this.getClass().getClassLoader().getResource("/").getPath() + "symmetric.properties";
            File configFile = new File(filePath);
            if (configFile.exists()) {
                configFile.deleteOnExit();
            }
            writer = new FileOutputStream(new File(filePath));
            this.symProp.store(writer, "#Created by DBTOOL. ");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return symProp;
    }

    /**
     * 获取机器名
     *
     * @Return String 机器名
     */
    private String getHostName () {
        try {
            return InetAddress.getLocalHost().getHostName().toString();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return "slaver-unknown";
    }
}
