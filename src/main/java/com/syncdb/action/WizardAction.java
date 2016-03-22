package com.syncdb.action;

import com.syncdb.bean.SyncdbApplication;
import com.syncdb.service.IWizardService;
import com.syncdb.utils.AjaxMsgBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

/**
 * 配置向导Action.
 * 测试连接
 * 生成节点配置文件
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */
@Controller
public class WizardAction {

    @Autowired
    private IWizardService wizardService;

    /**
     * 初始化引导界面
     */
    @RequestMapping(value="/wizard")
    public String wizard() {
        if (wizardService.needWizard()) {
            return "share/freemarker/wizard.ftl";
        } else {
            return "redirect:/";
        }
    }

    /**
     * 保存节点配置
     */
    @ResponseBody
    @RequestMapping(value="/wizard/save", method = {RequestMethod.POST})
    public AjaxMsgBean save(HttpServletRequest request) {
        String nodeType = request.getParameter("type");
        boolean isMasterNode = SyncdbApplication.ENGINE_SERVER_GROUP.equalsIgnoreCase(nodeType);
        String dbType = request.getParameter("db.type");
        String dbDriver = request.getParameter("db.driver");
        String dbUser = request.getParameter("db.user");
        String dbPsw = request.getParameter("db.psw");
        String registeUrl = isMasterNode ? "" : request.getParameter("registration.url");
        String groupId = nodeType;
        String syncURL = request.getScheme() + "://" + request.getHeader("host") + request.getContextPath() + "/sync/" + SyncdbApplication.ENGINE_NAME;
        wizardService.saveProps("db.type", dbType);
        wizardService.saveProps("db.driver", dbDriver);
        wizardService.saveProps("db.user", dbUser);
        wizardService.saveProps("db.password", dbPsw);
        wizardService.saveProps("sync.url", syncURL);
        wizardService.saveProps("registration.url", registeUrl);
        wizardService.saveProps("group.id", groupId);
        ServletContext ctx = request.getServletContext();
        ctx.setAttribute("db.type", dbType);
        ctx.setAttribute("db.driver", dbDriver);
        ctx.setAttribute("db.user", dbUser);
        ctx.setAttribute("db.password", dbPsw);
        ctx.setAttribute("sync.url", syncURL);
        ctx.setAttribute("registration.url", registeUrl);
        ctx.setAttribute("group.id", groupId);
        wizardService.genConfigFile();
        return new AjaxMsgBean("1");
    }

    /**
     * 测试数据库连接
     */
    @ResponseBody
    @RequestMapping(value="/wizard/testConn", method = {RequestMethod.POST})
    public AjaxMsgBean testConn(HttpServletRequest request) {
        String type = request.getParameter("type");
        String driver = request.getParameter("driver");
        String url = request.getParameter("url");
        String user = request.getParameter("u");
        String psw = request.getParameter("p");
        wizardService.saveProps("db.type", type);
        wizardService.saveProps("db.driver", driver);
        wizardService.saveProps("db.url", url);
        wizardService.saveProps("db.user", user);
        wizardService.saveProps("db.password", psw);
        String code = wizardService.testConnection() ? "1" : "0";
        return new AjaxMsgBean(code);
    }
}
