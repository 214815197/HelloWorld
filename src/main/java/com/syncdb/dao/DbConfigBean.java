package com.syncdb.dao;

import org.springframework.stereotype.Component;

/**
 * 数据库连接信息.
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */

@Component("dbConfig")
public class DbConfigBean {
    private String url;
    private String driver;
    private String user;
    private String psw;

    /**
     * 数据库URL
     * @return String 连接数据库的URL
     * */
    public String getUrl() {
        return url;
    }

    /**
     * 数据库URL
     * @param url 连接数据库的URL
     * */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * 数据库驱动
     * @return String 连接数据库的驱动
     * */
    public String getDriver() {
        return driver;
    }

    /**
     * 数据库URL
     * @param driver 连接数据库的URL
     * */
    public void setDriver(String driver) {
        this.driver = driver;
    }

    /**
     * 数据库驱动
     * @return String 连接数据库的用户
     * */
    public String getUser() {
        return user;
    }

    /**
     * 数据库URL
     * @param user 连接数据库的用户
     * */
    public void setUser(String user) {
        this.user = user;
    }

    /**
     * 数据库驱动
     * @return String 连接数据库的密码
     * */
    public String getPsw() {
        return psw;
    }

    /**
     * 数据库URL
     * @param psw 连接数据库的密码
     * */
    public void setPsw(String psw) {
        this.psw = psw;
    }
}
