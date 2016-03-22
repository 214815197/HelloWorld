package com.syncdb.service;

import java.util.Properties;

/**
 * 配置向导业务逻辑.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
public interface IWizardService {
    /**
     * 保存向导中设置的数据
     */
    public Properties saveProps(String key, String val);

    /**
     * 检测是否需要进行配置向导
     */
    public boolean needWizard();

    /**
     * 测试数据库连接
     *
     * @return boolean 是否连接成功
     */
    public boolean testConnection();

    /**
     * 设置用户名密码
     *
     * @param name 用户名
     * @param psw  密码
     */
    public void genUser(String name, String psw);

    /**
     * 生成节点配置文件
     *
     * @return Properties 配置对象
     */
    public Properties genConfigFile();


}
