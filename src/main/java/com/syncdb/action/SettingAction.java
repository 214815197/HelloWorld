package com.syncdb.action;

import com.syncdb.bean.SyncdbApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * 表同步设置控制器
 * 选择需要进行同步的表
 * 选择需要进行同步的字段
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/13
 */
@Controller
public class SettingAction {
    @Autowired
    private SyncdbApplication syncdbApp;

    /**
     * 同步表设置页面
     */
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    public String setting(HttpServletRequest request) {
        request.setAttribute("isEngineStarted", syncdbApp.isEngStarted() + "");
        return "share/freemarker/setting.ftl";
    }
}
