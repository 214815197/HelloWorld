package com.syncdb.action;

import com.syncdb.bean.SyncdbApplication;
import com.syncdb.service.ISymService;
import com.syncdb.service.IWizardService;
import com.syncdb.utils.AjaxMsgBean;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 首页控制器.
 * 执行配置向导
 * 登录
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
@Controller
public class IndexAction {
    @Autowired
    private IWizardService wizardService;

    @Autowired
    private SyncdbApplication syncdbApp;

    /**
     * 登录页面
     */
    @RequestMapping(value = "/login.htm", method = RequestMethod.GET)
    public String login(HttpServletRequest request) {
        return "share/freemarker/login.ftl";
    }

    /**
     * 登录功能
     */
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public AjaxMsgBean doLogin(HttpServletRequest request) {
        return new AjaxMsgBean("1");
    }

    /**
     * 首页
     *
     * @return 如果是首次配置，则到登录，如果非首次配置，则到配置引导
     */
    @RequestMapping(value = {"index", "/"}, method = RequestMethod.GET)
    public String index(HttpServletRequest request) {
        boolean isConfigured =  !wizardService.needWizard();
        request.setAttribute("isEngineStarted", syncdbApp.isEngStarted() + "");
        return isConfigured ? "share/freemarker/state.ftl" : "redirect:/wizard";
    }

}
